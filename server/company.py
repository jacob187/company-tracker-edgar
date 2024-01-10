from fastapi import FastAPI, HTTPException, Query
from typing import Annotated
from datetime import datetime
from setup import initialize_companies_and_identity as ici
import time

app = FastAPI()


@app.get("/company/{ticker}")
async def get_company_info(
    tickers: Annotated[list[str], Query()], years_back: int | None = 2
):
    """
    Retrieves financial information for a list of companies.

    Args:
        tickers (list[str]): List of company tickers.
        years_back (int, optional): Number of years to retrieve financial information for. Defaults to 2.

    Raises:
        HTTPException: Raised when an invalid ticker is passed.

    Returns:
        dict: Dictionary containing financial information for each company.
    """
    start_time = time.time()

    companies = await ici(tickers)
    try:
        facts_of_companies = {company.get_facts() for company in companies.values()}
        company_facts_dataframe = [fact.to_pandas() for fact in facts_of_companies]

    except AttributeError:
        raise HTTPException(
            status_code=404, detail="One or more of the companies do not exist"
        )

    output = {}

    my_facts = [
        "EarningsPerShareBasic",
        "GrossProfit",
        "OperatingExpenses",
        "Assets",
        "Liabilities",
        "CommonStockValue",
    ]

    # Get the current year
    current_year = datetime.now().year

    # Generate a list of frames for specified years back. Some with quarters, some without. This captures 10K and 10Q reports.
    frames = [
        f"CY{year}Q{quarter}{suffix}"
        for year in range(current_year - years_back, current_year + 1)
        for quarter in range(1, 5)
        for suffix in ["", "I"]
    ] + [f"CY{year}" for year in range(current_year - years_back, current_year + 1)]

    # Create nested dictionary with company tickers and associated facts
    output = {
        ticker: {
            fact: dict(
                company_df.loc[
                    (company_df["fact"] == fact) & (company_df["frame"].isin(frames)),
                    ["frame", "val"],
                ].values
            )
            for fact in my_facts
        }
        for ticker, company_df in zip(tickers, company_facts_dataframe)
    }

    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Elapsed time: {elapsed_time}")
    return output

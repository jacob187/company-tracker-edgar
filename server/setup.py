from edgar import Company, set_identity
from dotenv import load_dotenv
import os

load_dotenv()

name = os.getenv("NAME")
email = os.getenv("EMAIL")


async def initialize_companies_and_identity(company_names: list):
    """
    Initializes the companies and sets the identity.

    Args:
        company_names (list): A list of company names.

    Returns:
        dict: A dictionary containing the initialized companies.
    """
    set_identity(f"{name} {email}")

    companies = {name: Company(name) for name in company_names}

    return companies

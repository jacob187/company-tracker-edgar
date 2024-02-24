from edgar import Company, set_identity
from dotenv import load_dotenv
import os


class Setup:
    def __init__(self):
        load_dotenv()
        name = os.getenv("NAME")
        email = os.getenv("EMAIL")
        set_identity(f"{name} {email}")

    async def initialize_companies(self, company_names: list) -> dict:
        """
        Initializes the companies and sets the identity.

        Args:
            company_names (list): A list of company names.

        Returns:
            dict: A dictionary containing the initialized companies.
        """

        companies = {name: Company(name) for name in company_names}

        return companies

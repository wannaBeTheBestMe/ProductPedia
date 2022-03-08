# Product Comparison Tool

## Brief

This project was initiated (with myself as its sole developer) with the intention of allowing users to be able to simplify their purchase decisions and save their time. The objective was for users to be able to enter the URLs of products they have shortlisted for purchase, following which the program should (web) scrape information about the products from the URLs provided, generate comparison criteria, and ultimately, recommend, what are according to the program, the best products in that category, price range, etc.

The front-end uses React (refer to the ```package.json``` file for information about the front-end dependencies).
The front-end uses ```create-react-app```.
The back-end uses the the framework FastAPI (refer to ```requirements.txt``` for information about the back-end dependencies). (WIP)
The machine learning library currently being used is fastText. (WIP)

## Run

Both the front-end and back-end servers must be run in order for the application to function correctly. Run the following to start the front-end server:

```bash
cd frontend
npm start
```

Run the following to start the back-end server:

```bash
cd backend
./venv/Scripts/activate # Activate the virtual environment on Windows
source venv/bin/activate # Activate the virtual environment on *nix
python main.py
```

---

This project is licensed under the terms of the MIT License.

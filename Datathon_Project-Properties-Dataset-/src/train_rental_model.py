from models import RentalModel

if __name__ == "__main__":
    print("Initializing Rental Model Training...")
    rm = RentalModel()
    rm.train()
    print("Done.")

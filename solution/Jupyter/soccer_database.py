from pymongo import MongoClient, errors
from psycopg2 import OperationalError, connect
from sqlalchemy import create_engine

def create_connection():
    mongo_db = None
    mongo_client = None
    pg_conn = None

    try:
        mongo_client = MongoClient("mongodb://localhost:27017/")
        mongo_db = mongo_client["SoccerDB"]
    except errors.ConnectionFailure as e:
        print(f"Connection failed: {e}")
        return None, None

    try:
        pg_conn = connect(
            dbname="postgres",
            user="massimoredomi",
            password="",
            host="localhost",
            port="5432"
        )
    except OperationalError as e:
        print(f"PostgreSQL connection failed: {e}")

    return mongo_db, mongo_client, pg_conn


def close_connections(mongo_client, pg_conn):
    if mongo_client is not None:
        mongo_client.close()

    if pg_conn is not None:
        pg_conn.close()


def mongo_retrieve(db, collection_name):
    try:
        collections = {
            "appearances": db["appearances"],
            "club_games": db["club_games"],
            "game_events": db["game_events"],
            "game_lineups": db["game_lineups"],
            "games": db["games"],
        }

        collection = collections.get(collection_name)

        if collection is None:
            raise ValueError(f"Collection '{collection_name}' not found.")

        cursor = collection.find({}, {'_id': 0})
        lista = list(cursor)

        return lista

    except Exception as e:
        print(f"An error occurred while retrieving {collection_name}: {e}")
        return []


def post_retrieve(pg_conn, table_name):
    valid_tables = ["clubs", "competitions", "players"]

    if table_name not in valid_tables:
        print(f"Table '{table_name}' is not a valid table.")
        return [], []

    try:
        cur = pg_conn.cursor()
        query = f"SELECT * FROM {table_name};"
        cur.execute(query)
        column_names = [desc[0] for desc in cur.description]
        rows = cur.fetchall()
        result = [dict(zip(column_names, row)) for row in rows]
        cur.close()

        return result

    except Exception as e:
        print(f"An error occurred while retrieving data from {table_name}: {e}")
        return []


def save_to_postgres(df, pg_conn, table_name):
    try:
        # Create an SQLAlchemy engine
        engine = create_engine(f'postgresql+psycopg2://massimoredomi:@localhost:5432/postgres')

        # Save the DataFrame to PostgreSQL
        df.to_sql(table_name, engine, if_exists='replace', index=False)
        print(f"DataFrame saved to {table_name} successfully.")

    except Exception as e:
        print(f"An error occurred while saving data to {table_name}: {e}")


def save_to_mongo(df, db, collection_name):
    try:
        collection = db[collection_name]
        data = df.to_dict(orient='records')
        collection.insert_many(data)
        print(f"DataFrame saved to MongoDB collection {collection_name} successfully.")

    except Exception as e:
        print(f"An error occurred while saving data to MongoDB collection {collection_name}: {e}")

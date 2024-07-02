## Football Data Analysis System Report

### Index Table
* [Introduction](#introduction)
* [Task 1: Data Storage Design](#task-1-data-storage-design)
* [Task 2: Main Express Server Design](#task-2-main-express-server-design)
* [Task 3: Secondary Express Server Design](#task-3-secondary-express-server-design)
* [Task 4: Spring Boot Server Design](#task-4-spring-boot-server-design)
* [Task 5: Chat System Implementation](#task-5-chat-system-implementation)
* [Task 6: Web Interface for Data Query](#task-6-web-interface-for-data-query)
* [Task 7: Jupyter Notebooks for Data Analysis](#task-7-jupyter-notebooks-for-data-analysis)
* [Conclusions](#conclusions)

---

#### Task 1: Data Storage Design

##### Solution:
**Design and its motivations:**
To store the football data efficiently, I created six tables in PostgreSQL for static data such as clubs, competitions, nations, player statistics, players, and users. This relational database is chosen for its robustness, support for complex queries, and data integrity features. For dynamic data, I used MongoDB (SoccerDB) to store collections like appearances, careers, club games, game events, game lineups, games, and rankings, leveraging its flexibility and efficiency in handling large volumes of unstructured data.

##### Issues:
**Introduce the task:**
The primary challenge was to distinguish between dynamic and static data and choose appropriate storage methods for each. Dynamic data requires fast updates and retrieval, while static data benefits from the relational structure of PostgreSQL.

**Requirements:**
The design meets the assignment requirements by using PostgreSQL for static data, ensuring data integrity and supporting complex queries, and MongoDB for dynamic data, providing flexibility and efficient handling of frequently changing information.

- **Static Data (PostgreSQL):**
  - **Tables:** clubs, competitions, players, nations, player statistics, users
  - **Motivation:** Robust, supports complex queries, ensures data integrity.

- **Dynamic Data (MongoDB):**
  - **Collections:** appearances, careers, club games, game events, game lineups, games, rankings
  - **Motivation:** Flexible, handles large volumes of unstructured data efficiently.

##### Limitations:
To address potential limitations and ensure extensibility:

1. **Identifying Data Types:** User data, for example, is static, created once and stored as needed. Similar assessments were made for other data types.
2. **Data Organization:** Original data from Transfermarkt and additional datasets like nations, player statistics, and user information were organized based on usage needs.
3. **Adding Tables and Collections:** For MongoDB, creating additional collections like rankings simplified data retrieval, given the non-real-time update requirement.
4. **Data Cleaning:** Using pandas and Python, incomplete or damaged data was cleaned, retaining only the most complete rows.

**Extensibility and Adaptability:**
- New tables or collections can be added as needed without disrupting the existing structure.
- The use of PostgreSQL and MongoDB allows handling both structured and unstructured data flexibly.

**Potential Limitations:**
- **Data Updates:** Static data might require manual updates if real-time data is needed in the future.
- **Complex Queries:** More complex queries might be necessary as the system grows, potentially impacting performance.

Overall, the design aims to balance efficiency, scalability, and ease of use, addressing key challenges and limitations proactively.

---

#### Task 2: Main Express Server Design

##### Solution:
**Design and its motivations:**
The main Express server is designed to handle the front-end operations of the JFT Soccer website. It serves static assets such as HTML, CSS, and JavaScript files to the client and communicates with other backend servers to fetch and send data. The design of this server focuses on simplicity, speed, and efficiency, ensuring a smooth user experience.

**Key Features:**
- **Static Asset Serving:** The server delivers static files like HTML, CSS, and JavaScript to the client.
- **API Proxy:** Routes are set up to fetch data from the secondary Express server (connected to MongoDB) and the Spring Boot server (connected to PostgreSQL).
- **Client-Side Libraries:** Utilizes Bootstrap 5 for responsive design, jQuery 3.7.1 for DOM manipulation, and Axios for making HTTP requests.

**Advantages:**
- **Separation of Concerns:** Isolating the front-end server allows independent scaling and maintenance of the user interface without affecting backend logic.
- **Performance:** A lightweight server setup ensures quick response times and minimal latency in serving static assets.
- **Modularity:** Dividing client-side code into multiple files, each handling specific tasks, enhances maintainability and readability.

**Disadvantages:**
- **Complexity in Management:** Requires careful coordination between multiple servers, complicating deployment and debugging processes.
- **Potential Bottlenecks:** Increasing user interactions might challenge the server's ability to manage concurrent requests efficiently.

##### Issues:
**Introduce the task:**
This section refers to the challenge of designing a central server (Express) that is fast and can serve thousands of users. The primary challenge is to deliver static assets quickly and handle user interactions efficiently while acting as an intermediary between the client and backend servers.

**Requirements:**
The design of the main Express server meets the requirements by ensuring efficient delivery of static assets and facilitating communication with backend services. The server setup includes:

- **Client-Side Libraries:**
  - **Bootstrap 5:** Used for responsive design and ease of styling.
  - **jQuery 3.7.1:** Utilized for DOM manipulation and event handling.
  - **Axios:** Simplifies HTTP requests to backend servers.

##### Limitations:
**Potential Limitations:**
- **Scalability:** As the user base grows, the server might face challenges in managing a high volume of concurrent requests, necessitating optimization or scaling solutions.
- **Data Consistency:** Ensuring data consistency between multiple backend services can be complex and might require additional synchronization mechanisms.
- **Error Handling:** Robust error handling is required to manage potential failures in communication with backend services.

**Extensibility:**
- The modular structure of the client-side code and well-defined API routes ensure the server can be easily extended to accommodate new features and requirements.
- Integration of new client-side libraries or frameworks can be done with minimal disruption to existing functionality.

Overall, the main Express server is designed to provide a robust and scalable solution for serving the front end of the JFT Soccer website, ensuring efficient interaction between the client and backend services.

---

#### Task 3: Secondary Express Server Design

##### Solution:
**Design and its motivations:**
The secondary Express server is designed to handle dynamic data stored in MongoDB. Using the Model-View-Controller (MVC) architecture ensures clear separation of concerns, making the application more modular and maintainable. The server manages data related to game lineups, events, careers, games, and rankings, providing an API for the main Express server to interact with.

**Key Features:**
- **MVC Architecture:** Divides the application into Models, Views, and Controllers, organizing the code and making it easier to manage and scale.
- **MongoDB Integration:** Suitable for handling large volumes of dynamic and unstructured data.
- **API Endpoints:** Provides routes for CRUD operations on MongoDB collections.

**Advantages:**
- **Modularity:** MVC architecture allows for easy maintenance and scalability by separating business logic, data access, and presentation layers.
- **Efficiency:** MongoDB’s flexibility and schema-less nature make it ideal for efficiently storing and retrieving dynamic data.
- **Clarity:** Clear division of responsibilities within the codebase enhances readability and simplifies debugging.

**Disadvantages:**
- **Complexity in Query Writing:** Learning to write efficient queries in MongoDB can be initially challenging.
- **Overhead:** Managing multiple servers and ensuring seamless communication between them can introduce additional overhead.

##### Issues:
**Introduce the task:**
This section refers to the challenge of designing a secondary server (Express) that is fast and can handle dynamic data stored in MongoDB. The server must efficiently manage and serve thousands of requests related to game data, player careers, and other dynamic content.

**Requirements:**
The design of the secondary Express server meets the requirements by ensuring efficient management of dynamic data. The server setup includes:

- **Database Connection:** Connected to MongoDB at `mongodb://127.0.0.1:27017/SoccerDB`.
- **API Endpoints:** Routes are defined to handle CRUD operations for game lineups, events, careers, games, and rankings.

##### Limitations:
**Potential Limitations:**
- **Scalability:** As the user base grows, the server might face challenges in managing a high volume of concurrent requests, necessitating optimization or scaling solutions.
- **Data Consistency:** Ensuring data consistency between multiple backend services can be complex and might require additional synchronization mechanisms.
- **Error Handling:** Robust error handling is required to manage potential failures in communication with backend services.

**Extensibility:**
- The modular structure of the client-side code and the use of well-defined API routes ensure the server can be easily extended to accommodate new features and requirements.
- Integration of new client-side libraries or frameworks can be done with minimal disruption to existing functionality.

Overall, the secondary Express server is designed to provide a robust and scalable solution for managing dynamic data related to football statistics, ensuring efficient interaction between the main Express server and MongoDB.

---

#### Task 4: Spring Boot Server Design

##### Solution:
**Design and its motivations:**
The Spring Boot server is designed to manage the static data stored in PostgreSQL. This server uses a package structure based on the different data entities it handles, such as clubs, competitions, and nations. Each package contains the necessary components for that entity: controller, service, repository, and model. This structure ensures a clear separation of concerns and makes the application more modular and maintainable.

**Key Features:**
- **Package Structure:** Organizes code by data entities, making it easier to manage and scale.
- **Spring Data JPA:** Provides an abstraction over the data access layer, making database interactions more efficient and less error-prone.
- **RESTful APIs:** Exposes endpoints for CRUD operations on the data entities.

**Advantages:**
- **Modularity:** The package structure allows for easy maintenance and scalability by separating the business logic, data access, and presentation layers.
- **Efficiency:** Spring Boot and Spring Data JPA streamline the development process and improve performance.
- **Clarity:** Clear division of responsibilities within the codebase enhances readability and simplifies debugging.

**Disadvantages:**
- **Learning Curve:** Understanding Spring Boot and JPA can be challenging for beginners.
- **Overhead:** Managing multiple services and ensuring seamless communication between them can introduce additional overhead.

##### Issues:
**Introduce the task:**
This section refers to the challenge of designing a server (Spring Boot) that efficiently handles static data stored in PostgreSQL. The server must manage data related to clubs, competitions, and nations, providing an API for the main Express server to interact with.

**Requirements:**
The design of the Spring Boot server meets the requirements by ensuring efficient management of static data. The server setup includes:

- **Package Structure:**
  - **Controller:** Handles HTTP requests and responses.
  - **Repository:** Interfaces with the database.
  - **Service:** Contains the business logic.
  - **Model:** Represents the data model.

The server runs on `localhost:8082` and connects to PostgreSQL at `jdbc:postgresql://localhost:5432/postgres`.

##### Limitations:
**Potential Limitations:**
- **Scalability:** As the user base grows, the server might face challenges in managing a high volume of concurrent requests, necessitating optimization or scaling solutions.
- **Data Consistency:** Ensuring data consistency between multiple backend services can be complex and might require additional synchronization mechanisms.
- **Error Handling:** Robust error handling is required to manage potential failures in communication with backend services.

**Extensibility:**
- The modular structure of the code and the use of well-defined API routes ensure the server can be easily extended to accommodate new features and requirements.
- Integration of new libraries or frameworks can be done with minimal disruption to existing functionality.

Overall, the Spring Boot server is designed to provide a robust and scalable solution for managing static data related to football statistics, ensuring efficient interaction between the main Express server and PostgreSQL.

---

#### Task 5: Chat System Implementation

##### Solution:
**Design and its motivations:**
The chat system, implemented using socket.io, facilitates real-time communication among fans and pundits. Socket.io's bidirectional communication capability ensures a seamless and interactive chat experience.

**Key Features:**
- **Real-Time Communication:** Enables instant messaging between clients and server.
- **Room-Based Chats:** Users join specific chat rooms for focused discussions.
- **User-Friendly Interface:** Intuitive design for easy message exchange.

**Advantages:**
- **Efficiency:** Minimal latency in message delivery.
- **Scalability:** Handles multiple chat rooms and many users.
- **Interactivity:** Enhances user engagement with dynamic communication.

**Disadvantages:**
- **Complexity:** Real-time communication management adds complexity.
- **Learning Curve:** Socket.io integration can be challenging.

##### Issues:
**Introduce the task:**
Implementing a chat system using socket.io to handle real-time communication, multiple chat rooms, and a smooth user experience.

**Requirements:**
The design meets the assignment requirements by providing robust real-time communication.

- **Client-Side Implementation:** Initializes the chat interface, connects to the server, handles user interactions.
- **Server-Side Implementation:** Sets up socket.io, manages user connections, chat rooms, and message broadcasting.

##### Limitations:
**Potential Limitations:**
- **Scalability:** May face challenges with high user volume, requiring optimization.
- **Network Reliability:** Real-time performance depends on network stability.
- **Security:** Ensuring secure communication and access control is crucial.

**Extensibility:**
- Designed for easy addition of new features like private messaging and user authentication.
- Modular code structure allows seamless integration of new functionalities.

Overall, the chat system using socket.io offers a robust, scalable solution for real-time communication, enhancing interactivity and engagement on the JFT Soccer platform.

---

#### Task 6: Web Interface for Data Query

##### Solution:
**Design and its motivations:**
The web interface, built with Bootstrap, jQuery, and Axios, enables users to efficiently access and analyze football data.
The main Express server serves static assets and acts as an intermediary between the client and backend servers, ensuring a seamless user experience.

**Key Features:**
- **Responsive Design:** Bootstrap ensures the interface looks good on all devices.
- **DOM Manipulation:** jQuery simplifies event handling and AJAX requests.
- **HTTP Requests:** Axios manages data fetching from backend servers.
- **Express Server:** Handles API requests and forwards them to backend servers.

**Advantages:**
- **Responsive:** Accessible on desktop and mobile.
- **Dynamic Data Handling:** Fetches and displays data without page reloads.
- **Scalable:** Separation of concerns allows easy scaling and maintenance.

**Disadvantages:**
- **Complexity:** Managing multiple libraries can add complexity.
- **Load Time:** Initial loading of static assets may take time.

##### Issues:
**Introduce the task:**
Enable users to query the database via a web interface that provides easy access to football data.

**Requirements:**
The design meets requirements by offering a robust, user-friendly interface for querying data. Users can:
- View and search for clubs, competitions, and player statistics.
- Filter data by various criteria.
- Display results in a user-friendly format with detailed views.

##### Limitations:
**Potential Limitations:**
- **Performance:** May degrade with large data volumes, requiring optimization.
- **Input Handling:** Ensure user inputs are sanitized to prevent security issues.
- **Data Consistency:** Ensure data displayed is up to date.

**Extensibility:**
- Modular design allows easy addition of features or queries.
- Well-known libraries and frameworks make the codebase understandable and extendable.
- Future enhancements could include advanced filtering, data source integration, or better visualization.

##### Experience and Refactoring:
The main challenge was structuring the JavaScript for the web interface. I refactored the code three times to improve maintainability.

1. **Initial Approach:** Created a large, hard-to-maintain function for all interactions.
2. **First Refactor:** Divided the function into smaller, macro area-specific functions, which still had issues with data formatting.
3. **Second Refactor:** Adopted an object-oriented approach, making the code more modular and maintainable.

##### Interactivity and Usability:
The JFT Soccer web page is designed to be highly interactive, with multiple components that are clickable and interconnected.
Users can navigate the data via the search bar or by clicking on various elements like nations, competitions, or clubs, providing
multiple pathways to the same information and enhancing the user experience.

---

#### Task 7: Jupyter Notebooks for Data Analysis

##### Solution:
**Design and its motivations:**
Jupyter Notebooks were used for their interactive capabilities, allowing for combined code, text, and visualizations. Pandas handled data manipulation, while matplotlib and seaborn were used for visualizations.

**Key Features:**
- **Interactive Analysis:** Combines code, text, and visualizations.
- **Data Manipulation:** Utilizes pandas for data processing.
- **Visualization:** Uses matplotlib and seaborn for charts and graphs.
- **Documentation:** Inline markdown cells for clear documentation.

**Advantages:**
- **Ease of Use:** Immediate feedback on code execution.
- **Rich Visualizations:** Effective data insights with matplotlib and seaborn.
- **Documentation:** Clear and reproducible analysis process.

**Disadvantages:**
- **Performance:** Slows with large datasets or complex computations.
- **Version Control:** Challenging due to cell-based structure.

##### Issues:
**Introduce the task:**
Creating Jupyter Notebooks for football data analysis, including data cleaning, EDA, and visualizations.

**Requirements:**
The notebooks comply by providing:
- **Data Cleaning:** Handling missing values and preprocessing data.
- **EDA:** Summary statistics and initial visualizations.
- **Advanced Analysis:** In-depth trend analysis and visualizations.
- **Documentation:** Clear step-by-step methodology.

##### Limitations:
**Potential Limitations:**
- **Performance:** Slow with large datasets; may need optimization.
- **Complex Visualizations:** Might require advanced techniques or additional libraries.
- **Collaboration:** Difficult due to merge conflicts in version control.

**Extensibility:**
- Modular analysis allows easy addition of new steps.
- Popular libraries ensure future enhancements and functionality.

##### Experience and Challenges:
Creating the notebooks was both rewarding and challenging. Key challenges included:
- **Data Cleaning:** Extensive use of pandas to handle missing values.
- **Structuring the Notebook:** Breaking down the analysis into manageable sections.
- **Visualization:** Transitioning from basic matplotlib to advanced seaborn for better clarity.
- **Data Integration:** Ensuring data consistency across sources with custom functions.

Despite challenges, iterating on the analysis, visualizing data, and documenting findings was educational.
Future plans include exploring more advanced features and libraries, as well as machine learning applications for
football data analysis.

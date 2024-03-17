Getting Started
Follow these steps to get the project up and running on your local machine.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js and npm (for React)
Python 3 and Django (for the backend)
Git (for cloning the repository)
Clone the Repository
Clone the project repository to your local machine using Git:

git clone https://github.com/nutan-mali/react_django_event_project.git


Backend Setup
Navigate to the backend directory:

cd eventdjango

Install Django and other dependencies:

pip install -r requirements.txt
Apply database migrations:


python manage.py migrate

Start the Django development server:
python manage.py runserver
Access the application in your web browser at  http://127.0.0.1:8000/api/event_create/

Install React dependencies:
cd eventreact 

npm install

Start the React development server:
npm start
Access the application in your web browser at  http://localhost:3000


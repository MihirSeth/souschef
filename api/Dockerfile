# Dockerfile for Flask
FROM python:3.8

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y libgl1-mesa-glx

COPY . .

EXPOSE 5000

CMD [ "python", "app.py" ]
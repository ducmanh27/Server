FROM python:3.10-alpine

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

COPY . /user/src/app/

ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]
RUN apk add --no-cache postgresql-libs  \
    python3 python3-dev gcc g++ postgresql-dev libpq-dev\
    gfortran musl-dev
    
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools

COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip3 install --upgrade pip setuptools &&\
    pip install -r requirements.txt
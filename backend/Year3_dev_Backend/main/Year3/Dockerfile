FROM python:3.10.2-alpine

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

COPY . /user/src/app/

ENTRYPOINT [ "/usr/src/app/entrypoint.sh" ]

RUN pip install --upgrade pip

RUN apk add --no-cache postgresql-libs  \
    python3 python3-dev gcc postgresql-dev\
    gfortran musl-dev


COPY ./requirement.txt /usr/src/app/requirement.txt
RUN pip3 install --upgrade pip setuptools &&\
    pip install -r requirement.txt





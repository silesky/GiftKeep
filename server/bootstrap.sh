#!/bin/sh
mkdir -p ssl/dev
pushd ssl/dev
pwgen 50 1 -s > passphrase
openssl genrsa -des3 -out ca.key 1024
openssl req -new -key ca.key -out ca.csr
openssl x509 -req -days 365 -in ca.csr -out ca.crt -signkey ca.key
openssl genrsa -des3 -out server.key 1024
openssl req -new -key server.key -out server.csr
cp server.key server.key.passphrase
openssl rsa -in server.key.passphrase -out server.key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
popd

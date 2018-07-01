# rpc

Requirements:

- python3
- virtualenv (install with `pip3 install virtualenv` if missing)
- flask (install with `pip3 install flask` if missing)

Link lightning-rpc into `lnhw/rpc`:

`ln -s ~/.lightning/lightning-rpc ./lightning-rpc`

Run this:

```
$ python3 -m virtualenv env
$ source env/bin/activate
$ pip3 install -r requirements.txt
$ flask run
```

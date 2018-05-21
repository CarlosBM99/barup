#!/bin/bash
FILE1=$1
./p $FILE1
source test/bin/activate
python3 SortV1.py

#!/bin/bash
killall -9 java
nohup gradle clean bootRun &

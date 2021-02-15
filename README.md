# General Notes

- I have not used serverless before so there was time required to get up and running and review the documentation. I enjoyed the exercise and was able to see my lambda endpoint running live in the browser (before then adding cors to block public views)
- Unfortunately I did not get time to do more, but I found it very beneficial in terms of learning serverless, and would like to continue learning this technology in the future.

# How To Run On Local

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node version 12.x
- NPM

## Installation

Clone the repo and install dependencies:

- Clone the repo `git clone https://github.com/franklia/trend-micro-challenge.git`
- Navigate into the repo: `cd trend-micro-challenge`
- Run npm install to install the node modules

## Set up your environment variables:

Create a .env file in the root directory using the template below - use id's from your own AWS account that you are authenticated with in your terminal

- AWS_SECURITY_GROUP_ID_1=
- AWS_SECURITY_GROUP_ID_2=

Launch app:

- Run `serverless offline` to start your local server, view the app at this url in your browser: `http://localhost:3000/dev/getSecurityGroups`

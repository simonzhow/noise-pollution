# Summer Internship Project - Simon

Utilizes citywide New York police data to show the number of noise complaints in various regions within the greater New York area.

## Description

Uses Mapbox, Deck.GL, and React

## Requisites For Running This Application
1. Ensure Node is installed (running `node -v` on command line should return version >=6.0)
2. Install Yarn if not installed already (running `yarn version` on command line should return version >=0.23.4)
3. Ensure MongoDB is installed (running `mongod --version` on command line should return version >=3.2.0)
4. Get `.env` file from one of the contributors and place it in root. (This file contains API keys and secrets and has not been uploaded on Github)

## Running the Application
1. Run `git clone [This Repository]` and cd into the folder.
2. Run `sudo mongod` and keep it in the background
3. In a new terminal window, run `yarn install`.
4. Once yarn install is complete, run `yarn start`
5. Go to [localhost:8000](localhost:8000).

## Demo
https://www.youtube.com/watch?v=Rhl0HH_OGVg&feature=youtu.be

## JSDocs
#### Generating JSDocs
Run `yarn doc` to generate the jsdocs (they will be saved in `/jsdocs`)
  * **IMPORTANT:** Don't do this unless you NEED TO UPDATE DOCS as it modifies all pre-existing html files, even if their corresponding annotations weren't modified.

#### Viewing JSDocs
Run `yarn viewdocs` to view the docs in your browser.

Reach out to anybody on the team regarding questions or concerns.

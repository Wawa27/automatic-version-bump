# Automatic version bump

Automatically update a package.json version after a push. This action update the last pushed commit instead of creating
a new commit.

Requires NodeJS 14+

## How to use

### Unprotected branch

The following action will update your package.json on push on the dev branch:

    name: CI / Bump version
    on:
        push:
            branches:
                - dev
    jobs:
        bump:
            name: "Bump Version"
            runs-on: ubuntu-latest
            steps:
                - name: "Checkout source code"
                  uses: "actions/checkout@v2"
                  with:
                    ref: ${{ github.ref }}
                    fetch-depth: 0
                - name: "Bump version"
                  uses: Wawa27/automatic-version-bump@master

### Protected branch

The following action will update your package.json on push on the dev branch, you will need to create a token with push
right on the specified branch

    name: CI / Bump version
    on:
        pull_request:
            branches:
                - dev
            types: [closed]
    jobs:
        bump:
            if: github.event.pull_request.merged == true
            name: "Bump Version"
            runs-on: ubuntu-latest
            steps:
                - name: "Checkout source code"
                  uses: "actions/checkout@v2"
                  with:
                      token: ${{ secrets.TOKEN }}
                      fetch-depth: 0
                - name: "Bump version"
                  uses: Wawa27/automatic-version-bump@master


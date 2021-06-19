# Generate Commit Hashes for Project

This handy tool helps get the commit hash against entire repository of projects -> handy if we have multiple services going into a single release

## Installation

Clone repository and install

```bash
npm install
```

## Usage

```bash
npm start

Install VSCode + Rest Client Extension and run the POST from project.http 

POST http://localhost:3000/hashes/project_name
Content-Type: application/json

POST http://localhost:3000/hashes/project_name
Content-Type: application/json

{
  "release": "release_branch",
  "services": [
    "service_1",
    "service_2"
  ]
}

Output
{
  "project": "project_name",
  "release": "release_branch",
  "commitHashes": [
    {
      "repo": "service_1",
      "latest": "e2caf80874f06f2bbc5a6f1ff3b59a1c79b18d18"
    },
    {
      "repo": "service_2",
      "latest": "d3304b853b44ec048cd8b9d37530b4066650f60f"
    }
  ]
}

```

## Contributing
Pull requests are welcome. Please make sure to update tests as appropriate.

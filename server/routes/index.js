import express from 'express';
import axios from 'axios';
let router = express.Router();

const options = {
  headers: {
    Authorization: 'Bearer xxx',
  },
};

const BASE_URL =
  'https://bitbucket.com/rest/api/1.0/projects';

const callAPi = (repo, url, options) => {
  return axios
    .get(url, options)
    .then(response => ({ ...response.data, repo }))
    .catch(err => console.log(err));
};

router.route('/hashes/:project').post((req, res) => {
  const project = req.params.project;
  const services = req.body.services;
  const release = req.body.release;
  const releaseUrl = req.body.release.replace('/', '%2F');

  if (services === null || services.length === 0) {
    // const result = axios
    //   .get(`${BASE_URL}/${project}/repos`, options)
    //   .then(response => response.data)
    //   .catch(err => console.log(err));
    // services = result.values.map(({ slug }) => slug);
    res.json({
      project,
      release,
      commitHashes: [],
    });
  }

  const urls = services.map(repo => ({
    repo,
    url: `${BASE_URL}/${project}/repos/${repo}/commits?until=${releaseUrl}`,
  }));
  Promise.all(urls.map(({ repo, url }) => callAPi(repo, url, options))).then(
    services => {
      const commitHashes = services.map(({ repo, values = [] }) => ({
        repo,
        latest: values[0].id,
      }));

      res.json({
        project,
        release,
        commitHashes,
      });
    }
  );
});

export default router;

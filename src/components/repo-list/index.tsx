import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import RepoItem from "./RepoItem";
import { REPO_ITEM } from "../../constants/repo";
import Readme from "./Readme"

const RepoList = () => {
  const { user } = useParams();
  const [repoList, setRepoList] = useState<REPO_ITEM[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>();
  const [contentReadme, setContentReadme] = useState<any>();
  const [showReadme, setShowReadme] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      fetch(`https://api.github.com/users/${user}/repos`)
        .then((response) => response.json())
        .then((data) => {
          let customizeRepoList = data.map((repoItem: { language: string; id: number; fork: number; url: string; name: string; open_issues: number; watchers: number; }) => {
            return {
              language: repoItem?.language,
              id: repoItem?.id,
              fork: repoItem?.fork,
              url: repoItem?.url,
              name: repoItem?.name,
              open_issues: repoItem?.open_issues,
              watchers: repoItem?.watchers,
            }
          })
          setRepoList(customizeRepoList);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (selectedRepo) {
      fetch(`https://api.github.com/repos/${user}/${selectedRepo}/contents/README.md`)
        .then(response => response.json())
        .then(data => setContentReadme(atob(data.content)))
        .catch(error => setContentReadme(`We can't find README file from this repo!!!`));
    }
  }, [selectedRepo])

  const handleClickRepoItem = (repo: string) => {
    setSelectedRepo(repo);
    setShowReadme(true)
  }

  return (
    <>
      <div className="repo-container">
        <Link to={"/"} className="back-btn">
          &laquo; Back
        </Link>
        <h1>Repo List</h1>
        <i>{repoList.length} repositories of the first 30 repositories</i>
        {repoList && repoList.length > 0 && (
          <div className="repo-list">
            {repoList.map((repo) => (
              <div onClick={() => handleClickRepoItem(repo.name)} key={repo.name}>
                <RepoItem repoInfo={repo} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Readme
        showReadme={showReadme}
        contentReadme={contentReadme}
        onClick={setShowReadme}
      />
    </>
  );
};

export default RepoList;

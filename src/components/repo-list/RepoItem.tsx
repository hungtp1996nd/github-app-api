import Chip from "../common/chip";
import { REPO_ITEM } from "../../constants/repo";
import React from "react";
import "../../styles/repo-item.css";

const RepoItem: React.FC<{ repoInfo: REPO_ITEM }> = ({ repoInfo }) => {
  return (
    <>
      <div className="repo-item-container">
        <h3 className="title-repo">{repoInfo.name}</h3>
        <div className="detail-repo">
          <table>
            <tr>
              <td>Open issues</td>
              <td>{repoInfo.open_issues}</td>
            </tr>
            <tr>
              <td>Fork</td>
              <td>{repoInfo.fork}</td>
            </tr>
            <tr>
              <td>Watchers</td>
              <td>{repoInfo.watchers}</td>
            </tr>
            <tr>
              <td>Language</td>
              <td>
                {repoInfo.language ? <Chip label={repoInfo.language} /> : null}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default RepoItem;

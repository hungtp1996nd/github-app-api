import React from 'react';
import Modal from "react-bootstrap/Modal";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Readme: React.FC<{showReadme: boolean, contentReadme: string, onClick: (b: boolean) => void}> = ({showReadme, contentReadme, onClick}) => {
  return (
    <>
      <Modal
        show={showReadme}
        onHide={() => onClick(false)}
        aria-labelledby="readme-content-from-repo"
      >
        <Modal.Header closeButton>
          <Modal.Title id="readme-content-from-repo">
            <strong>README</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {<ReactMarkdown
            children={contentReadme}
            rehypePlugins={[rehypeRaw]}
          />}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Readme;
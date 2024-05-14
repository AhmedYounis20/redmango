import React from 'react'

export default function AccessDenied() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <h2 className="text-danger">
        Access Denied Only Admin can visit this page
      </h2>
    </div>
  );
}

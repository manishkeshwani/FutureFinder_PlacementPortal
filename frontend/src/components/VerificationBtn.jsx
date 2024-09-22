import React from 'react';
import { Link } from 'react-router-dom';

const VerificationBtn = ({ navigateLink }) => {
    return (
        <div>
            <Link to={navigateLink}>
                <button
                    type="button"
                    className="btn btn-primary mt-3"
                    style={{
                        backgroundColor: "wheat",
                        border: "1px solid wheat",
                        color: "#e55d1b",
                        fontWeight: "600",
                    }}
                >
                    Verify Student
                </button>
            </Link>
        </div>
    );
};

export default VerificationBtn;

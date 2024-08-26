import { Outlet, Link } from "react-router-dom";

function Home({ users }) {
  return (
    <div className="row">
      {users.map((user) => {
        return (
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p>
                  {user.email} || {user.mobile}
                </p>
                <Link
                  className="card-link btn btn-warning"
                  to={`/user/edit/${user.id}`}
                >
                  Edit
                </Link>
                <Link
                  className="card-link btn btn-primary"
                  to={`/user/view/${user.id}`}
                >
                  View
                </Link>
                <Link
                  className="card-link btn btn-danger"
                  to={`/user/delete/${user.id}`}
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;

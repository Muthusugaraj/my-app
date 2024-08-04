function Home({ user }) {
  retun(
    <div className="card" style="width: 18rem;">
      <div className="card-body">
        <h5 className="card-title">{user.username}</h5>
        <div className="card-link">{user.email}</div>
        <div className="card-link">{user.mobileno}</div>
      </div>
    </div>
  );
}

export default Home;

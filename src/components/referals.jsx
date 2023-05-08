const Referals = ({ referals }) => {
  const time = new Date();
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  return (
    <div className="comp_dashboard">
      <div className="refer_comp">
        <h2>Total Referrals: {referals.length}</h2>
        <p>{day + "/" + month + "/" + year}</p>
      </div>
    </div>
  );
};

export default Referals;

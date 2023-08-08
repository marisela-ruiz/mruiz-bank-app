function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      txtcolor="black"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Add another account
    </button>
  </>);
}

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    const url = `/account/update/deposit/${email}/${amount}`;
    (async () => {
      let res = await fetch(url); // ---> returns [object Response]
      let data = await res.text();
      console.log(`Updated balance is ${data}`); // ---> returns balance as integer
      props.setStatus(`New balance is ${data}.`);
    })();
      props.setShow(false);   
    }
  

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}
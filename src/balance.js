function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor=""
      txtcolor="black"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success!</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  

  function handle(){
    const url = `/account/update/balance/${email}`;
    (async () => {
      let res = await fetch(url); // ---> returns [object Response]
      let data = await res.text();
      //console.log(data);
      if(data != '') {
      console.log(`Updated balance is: ${data}`); // ---> returns balance as integer
      props.setStatus(`Updated balance is ${data}.`);
      setBalance(data)
      } else {
        console.log('User does not exist');
        props.setStatus('User doest not exist')
        props.setShow(true);
      }
    })();
      props.setShow(false);   
    }

  return (<>
    <h5>Current Balance: ${balance}</h5><br/>
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}
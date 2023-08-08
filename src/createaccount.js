function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      txtcolor="black"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setStatus={setStatus}/> : 
        <CreateMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success! Please log in with new user credentials.</h5>
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

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    //console.log(name,email,password);
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      let res  = await fetch(url); // ---> returns [object Response]
      let data = await res.text();
      //console.log(`this is createaccount fetch: ${data}`); //---> returns stringified object
        if(res.status == 400) {
          console.log('User already exists. Please try again');
          let loginFailed = 'User already exists. Please try again.';
          props.setStatus(loginFailed);
          props.setShow(true);
        } else {    
          console.log(data);
          props.setStatus('')
        //props.setStatus()   
        }
        
    })();
    props.setShow(false);
  }

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}
import axios from 'axios';
import { useState } from 'react/cjs/react.development';
import './App.css';

function App() {
  const [file, set_file] = useState();
  const [previewURL, set_previewURL] = useState();

  const [object_name, set_object_name] = useState();

  const handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      set_file(file);
      set_previewURL(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const send_image_options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      name: file,
      data: previewURL,
    })
  }
  const option = {
    url:'http://221.158.52.168:3003/send',
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      name: file,
      data: previewURL,
    })
  }
  const send_image = () => {
    console.log('send image');
    // fetch('http://221.158.52.168:3003/send', send_image_options)
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res.message);
    //   })
    //   .catch(err => {
    //     console.log('send image 문제');
    //   })
    axios(option).then(res=>res.json()).then(res => console.log(res));
  }
  const detect_image_options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      name: file,
    }),
  }
  const detect_image = () => {
    console.log('detect image');
    fetch('http://221.158.52.168:3003/detect', detect_image_options)
      .then(res => res.json())
      .then(res => {
        set_object_name(res.Res);
      })
      .catch(err => {
        console.log('detect error');
      })
  }

  let preview = null;
  if (file != '') {
    preview = <img src={previewURL} />
  }

  return (
    <div className="App">
      <div>
        <input type='file' accept='image/jpg,image/png,image/jpeg,image/gif' name='profile_img' onChange={handleFileOnChange} />
      </div>
      {preview}
      <button onClick={() => send_image()}>사진 전송</button>
      <button onClick={() => detect_image()}>물체 인식</button>
    </div>
  );
}

export default App;
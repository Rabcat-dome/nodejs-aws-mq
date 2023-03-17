/*
  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const mqtt = require('mqtt')
const uuidv1 = require('uuid/v1');

// Get arguments from the command line
// node app.js "username" "password" "wss://endpoint:port" "some/topic"
//const args = process.argv.slice(2)

let options = {
  username: "activemq",
  password: "874521Active",
  clientId: 'mqttclient01',
  clean: false
}

let qosOptions = {qos:1};

let mqEndpoint = "wss://b-769365f5-edc6-47cf-a2d3-26a29cea937b-1.mq.ap-southeast-1.amazonaws.com:61619"
let topic = "testTopicRetain"

let client = mqtt.connect( mqEndpoint, options)

// Once connected subscribe to the topic
client.on('connect', function() {
  console.log("connected")
  client.subscribe(topic, qosOptions, function (err) {
    if(err) {
      console.log(err)
    }else{
      console.log("Subscribed successfully");
    }
  })
})

client.on('error', function (error) {
  console.log(error)
})

// Log messages
//จากตัวอย่างจะดึงแค่ตัวล่าสุดออกมา
client.on('message', function (topic, message) {
  console.log(`${new Date}: message received on ${topic}: ${message.toString()}`)
})
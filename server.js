/* NOTE: We will test this using the following input for the server which we will enter in the broswer address bar:
    localhost:8080/path1/path2/?year=2020&month=February
    this above is a typical request structure from a client and follows the 
    structure of endpoint + query-parameters. The endpoint (e.g., https://www.smashingmagazine.com/tag/javascript or in our case localhost:8080/path1/path2/) is comprised of the root-endpint
    (e.g., https://smashingmagazine.com or in our case localhost:8080) plus any specific paths needed (e.g.,/tag/javascript or in our case /path1/path2/ ) and ends with a "/", there is always and "/" following the root-endpoint even if there are no path terms. The query parameters follow the "/" at the end of the endpoint and begin with a ? and multiple parameters are connected with &. So in our request for this server example: localhost:8080/ is the endpoint (note in this case there are no paths specified) and our query parameters (the specific information we are requesting) are year=2020 and month=february, written in the request as ?year=2020&month=february. 
 */
const http = require('http'); /* uses node built-in HTTP for server set up */

const url = require('url'); /* uses node built-in URL to resolve and parse a universal/uniform resource locator (e.g., a web address/request from the client)   */

http.createServer(function(req, res) { /* uses node built-in function createServer to, well, create a server */

    if (req.url === '/favicon.ico') { /* this if statement prevents a second automatic request that some servers (e.g., chrome) make for a favicon. The stuff we are interested in comes in the else section of the if else statement. The if else statement isn't needed for the server to respond properly, it just makes the console.log output of interest in the terminal easier to find as you don't have to scroll through a bunch of unwanted console.log output. */
        res.writeHead(404); 
        res.end('this output is prevented'); /* In this case, res.end will not output anything as the request that some browsers (e.g., Chrome) automatically make for updated favicon.ico has been prevented by the if statement */
    } else {
    res.writeHead (200, {'Content-Type': 'text/html'}); /* sets Header which tells client brower what to expect. In this case, if the incoming request provides a 200 status (i.e., request from browser has succeeded), tell server to it should be sending out text and html back to client browser) */

    var basicURL = req.url; /* creates a variable called basicURL which is used to demonstrate what req.url does. It provides everything after the root-endpoint. That is, we req.url retrieves the path and query terms (e.g., in our case since we get /path1/path2/?year=2020&month=February ) */
    console.log(`basic URL equals ${basicURL}`); /* show value of basicURL in terminal */

    var parseFalse = url.parse(req.url, false); /* creates a variable named parseFalse whereby all req.url information possible are returned. */
    console.log(`\nSetting second parse term to false produces an object containing: ${JSON.stringify(parseFalse)}`);

    var parseTrue = url.parse(req.url, true); /* parseTrue variable created whereby all req.url information is returned, operates just like parseFalse. Why? because we need to tell parse true what specific information we want, without that instruction it just provides all the info*/
    console.log(`\nSetting second parse term to true produces an object containing: ${JSON.stringify(parseTrue)}`);

    var parseFalseQuery = url.parse(req.url, false).query; /* creates a variable named parseFalseQuery whereby only req.url information with an key name that equals query are returned. NOTE: This returns the exact text of the query because the second term in url.parse is set to false, so you get "year=2020&month=February"  */
    console.log(`\nSetting second parse term to false and using .query provides the text for the query: ${parseFalseQuery}`);

    var parseTrueQuery = url.parse(req.url, true).query; /* parseTrueQuery variable created whereby only req.url information with key name of query is returned. NOTE: this returns the information for query as an object with key value pairs, {"year":"2020","month":"February"} */
    console.log(`\nSetting second parse term to true and using .query produces an object containing: ${JSON.stringify(parseTrueQuery)}`);
    

    var txt = parseTrueQuery.month + ' ' + parseTrueQuery.year; /* create variable named txt whose value equals the object in variable parseTrueQuery named month (parseTrueQuery.month) inserts a space (" ") and finally the parseTrueQuery object named year (parseTrueQuery.year). These variable names are long for demo purposes, would use shorter names for a project*/
    
    res.write(`I'm up and running :)`); /* example text to send to browser */
    res.write(`<h1>Hi There</h1>`); /* example html to send to broswer */
    res.write(`${txt} <a href="https://google.com" target="_blank">google link<a>`); /* example variable value, text, & html sent to browser at close of the response */
    res.write(`<h3></h3>`);/* spacing to make res.end text easier to differeniate from last res.write */
    res.end('output for res.end') 
    console.log(`--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`); /* used to demarcate in terminal where one request and res from browswer ends and another begins */
    }

}).listen(8080); /* port at which the server listens for request from browswer, in this case 8080 */

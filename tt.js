//get start and end dates from server
var stdate = new Date();
stdate.setFullYear(2012, 06, 02);//get from server
var endate = new Date();
endate.setFullYear(2012, 10, 20);//get from server

//populate week list
var st = stdate.getDay();
var diff = Math.round(Math.abs((endate.getTime() - stdate.getTime())/(24*60*60*1000)));
var n = ((diff-(7-st))/7)+2;



//function to populate values in faculty table
function poptable()
{
	//get all values from server and populate the table by enclosing data into a <div> inside <td>
	
	
}

var curdate;

//function to populate week drop down box
function popweek()
{
	for(var i=1;i<=n;i++)
	{
		var temp = "<option id=\"w"+i+"\" value="+i+">Week"+i+"</option>";
		var temp2 = document.getElementById("week").innerHTML;
		document.getElementById("week").innerHTML = temp2+temp;
	}
}

//function to set dates
function setDate()
{
	curdate = stdate;
	var temp = curdate.getDay();
	for(var i=temp;i<6;i++)
	{
		temp = "dt"+i;
		try{
		document.getElementById(temp).innerHTML = curdate.getDate()+"-"+(curdate.getMonth()+1)+"-"+curdate.getFullYear();
		}catch(e){}
		curdate = new Date(curdate.getTime()+86400000);
	}
}


function changeweek(x)
{
	
	
	if(x==1)
		setDate();
	else
	{
		var zzzdate = stdate;
		zzzdate = new Date(zzzdate.getTime()+(((7-st)+(7*(x-2)))*86400000));
		var temp = zzzdate.getDay();
		for(var i=temp;i<6;i++)
		{
			temp = "dt"+i;
			try{
			document.getElementById(temp).innerHTML = zzzdate.getDate()+"-"+(zzzdate.getMonth()+1)+"-"+zzzdate.getFullYear();
			}catch(e){}
			zzzdate = new Date(zzzdate.getTime()+86400000);
		}
	}
}

var n;
var regnos;
var abs = new Array(100);
var over;
var dt;
var hour;
function attend(cell)
{
	if((document.getElementById("attend").style.display!="block")/* && (document.getElementById(cell).style.backgroundColor!="rgb(192, 210, 255)")*/)
	{
	over = cell;
	dt = "dt"+cell.charAt(1);
	hour = cell.charAt(2);
	n = 56;//get number from server
	for(var j=0;j<n;j++)
		abs[j]=1;
	regnos = "31509104001|31509104002|31509104003"; // get from server based on cell id
	var arr = regnos.split("|");
	document.getElementById("attendtable").innerHTML="";
	var temp="";
	for(var i=0;i<n;i++)
	{
		if(i%10==0)
			temp+="<tr>";
		temp+="<td><div id=\"s"+i+"\" onclick=\"markabsent(this.id);\">"+arr[i]+"</div></td>";
		if(i%10==9)
			temp+="</tr>";
		else if(i==(n-1))
			temp+="</tr>";
	}
	document.getElementById("attendtable").innerHTML=temp;
	document.getElementById(cell).style.backgroundColor="red";
	document.getElementById("attend").style.display="block";
	}
	else
	{
		if(document.getElementById(cell).style.backgroundColor=="red")
		{
		document.getElementById("attend").style.display="none";
		document.getElementById(cell).style.backgroundColor="rgb(80, 243, 80)";
		}
	}
		
}

function markabsent(no)
{
	if(abs[no.substring(1,no.length)]==1)
	{
		document.getElementById(no).style.backgroundColor="red";
		abs[no.substring(1,no.length)] = 0; //mark 0 for absent
	}
	else
	{
		document.getElementById(no).style.backgroundColor="rgb(175, 230, 35)";
		abs[no.substring(1,no.length)] = 1;
	}
}

//to send the attendance lists
function sendlist()
{
	alert("Date : "+document.getElementById(dt).innerHTML+"\nHour: "+hour+"\n"+abs);
	document.getElementById(over).style.backgroundColor=/*"rgb(192, 210, 255)"*/"rgb(80, 243, 80)";
	document.getElementById("attend").style.display="none";
}


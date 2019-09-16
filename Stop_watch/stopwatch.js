$(function(){
    var mode = 0;
    var timeCounter= 0;
    var lapCounter = 0;
    var action; //variable for SetInterval
    var lapNumber = 0;
    
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    //on App load who start button and lap button
    hideshowButtons("#startButton", "#lapButton");
    
    //clink on startButton
    $("#startButton").click(function(){
        mode = 1;
        hideshowButtons("#stopButton", "#lapButton");
        startAction();
    });
    
    //stop counter
    $("#stopButton").click(function(){
        hideshowButtons("#resumeButton", "#resetButton");
        clearInterval(action);
    });
    
    //resume counter
    $("#resumeButton").click(function(){
        hideshowButtons("#stopButton", "#lapButton");
        startAction();
    });
    
    // reset both timer and lap
    $("#resetButton").click(function(){
        hideshowButtons("#startButton", "#lapButton");
        location.reload();
    });
    
    $("#lapButton").click(function(){
        //if mode is On
        if(mode){
            //stop interval
            clearInterval(action);
            //reset lap and print lap details
            lapCounter = 0;
            addLap();
            startAction();
        }
    });
    
    function hideshowButtons(x, y){
        $(".button").hide();
        $(x).show();
        $(y).show();
    }
    
    //start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;
            }
            updateTime();
        }, 10);
    }
    
    //update time: converts counters to min, sec, centisec
    function updateTime() {
        //1min == 60*100centisecs = 6000centisecs
        timeMinutes = Math.floor(timeCounter/6000);
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = Math.floor(timeCounter%6000)%100;
        $("#timeminutes").text(format(timeMinutes));
        $("#timeseconds").text(format(timeSeconds));
        $("#timecentiseconds").text(format(timeCentiseconds));
        
        
        lapMinutes = Math.floor(lapCounter/6000);
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = Math.floor(lapCounter%6000)%100;
        $("#lapminutes").text(format(lapMinutes));
        $("#lapseconds").text(format(lapSeconds));
        $("#lapcentiseconds").text(format(lapCentiseconds));
    }
    
    function addLap(){
        lapNumber++;
        var myLapDetails = '<div class="lap" '+
                             '<div >' +                 
            '<span class = "laptimetitle">' + 'Lap' + lapNumber +'</span>' +
            '<span class = "laptime" >'+ 
            '<span>' + format(lapMinutes) + '</span>' +
            ':'+
            '<span>' + format(lapSeconds)+'</span>' +
            ':'+
            '<span>' + format(lapCentiseconds) + '</span>' + 
                            '</span>' + 
                              '</div>'+
                              
                           '</div';
        $(myLapDetails).prependTo("#laps");
    }
    

    function format(number){
        if(number<10){
            return "0"+number;
        }
        else{
            return number;
        }
    }
});




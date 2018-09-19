//pie
data = {
   labels: ['Adventurous','Friendly','Temperamental','Mindful'],
            datasets: [
                {
                    data: {{chartData}} ,
                    backgroundColor: [
                'rgba(255,255,0,1)',
                'rgba(0, 255, 255, 1)',
                'rgba(255, 0,255, 1)',
                'rgba(0, 255, 0, 1)'
                ]
                }
            ]
        };

        var ctx = document.getElementById("myChart").getContext("2d");
        var myNewChart = new Chart(ctx , {
	type: "doughnut",
    	data: data
	});

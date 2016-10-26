<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.lang.*;"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Analysis</title>
<!-- jQuery Version 1.11.0 -->
<script src="js/bootstrap/jquery-1.11.0.js"></script>
<!-- Bootstrap Core JavaScript -->
	<script src="js/bootstrap/bootstrap.min.js"></script>
	<!-- Plugin JavaScript -->
    <script src="js/bootstrap/jquery.easing.min.js"></script>
<script type="text/javascript">
//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}); 
// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

</script>
<script src="js/highcharts/highcharts.js"></script>
<script src="js/highcharts/exporting.js"></script>
<style type="text/css">
button {
	padding: 10px 40px 10px 40px;
	margin-top: 7%;
}
</style>
<!-- Bootstrap Core CSS -->
<link href="css/bootstrap.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="css/result.css" rel="stylesheet">
</head>
<body>
	<%
		String name = (String) request.getAttribute("Name");
		Double analysis[] = (Double[]) request
				.getAttribute("AnalysisArray");
		Integer levelArray[] = (Integer[]) request.getAttribute("levelArray");
	%>
	<nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<a class="navbar-brand page-scroll" href="#page-top"> <i
				class="fa fa-play-circle"></i> <span class="light">Hungry</span>
				Shark
			</a>
		</div>
	</div>
	</nav>
	<header class="intro">
	<div class="intro-body">
		<div class="container">
			<div class="row analysis-table">
				<div id="container" align="center"
					style="min-width: 310px; height: 400px; margin: 0 auto"></div>
					
					<div id="learningCurve" align="center"
					style="min-width: 310px; height: 400px; margin: 0 auto"></div>
					<br>
				<div id="GoBack" align="center">
					<a href="/Ratings/adminView"><button>Go Back</button></a>
				</div>
			</div>
		</div>
	</div>
	</header>
	<script type="text/javascript">
$(function () {
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Analysis of <%=name%>'
        },
        subtitle: {
            text: 'Source: Hungry Shark Game'
        },
        xAxis: {
            categories: [
                'Analysis'
            ]
        },
        yAxis: {
        	plotLines: [{
        		color:'white',
                value: 0,
                width :2,
                label : {
                    text : 'Poor'
                }
                
        	},{
        		color: 'red',
                value: 20,
                dashStyle : 'shortdash',
                width : 2,
                label : {
                    text : 'Average'
                }
        	},{
        		color: 'yellow',
                value: 40,
                dashStyle : 'shortdash',
                width : 2,
                label : {
                    text : 'Good'
                }
        	},{
        		color: 'green',
                value: 65,
                dashStyle : 'shortdash',
                width : 2,
                label : {
                    text : 'Excellent'
                }
        	},{
        		color: 'blue',
                value: 100,
                dashStyle : 'shortdash',
                width : 2,
        		
        	}],
            min: 0,
            max: 100,
            title: {
                text: '%'
            },
        	
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Logic',
            data: [<%=analysis[0]%>],
        	
        }, {
            name: 'Adaptability',
            data: [<%=analysis[1]%>]

        }, {
            name: 'Accuracy',
            data: [<%=analysis[2]%>]

        }, {
            name: 'Flaw Detection & Utilization',
            data: [<%=analysis[3]%>]

        },{
            name: 'Focus',
            data: [<%=analysis[4]%>]

        },{
        	name: 'Overall',
            data: [<%=analysis[5]%>]
        }]
    });
});


</script>
<script type="text/javascript">
$(function () {
    $('#learningCurve').highcharts({
        title: {
            text: 'Learning Trend Chart',
        },
        /* subtitle: {
            text: 'Source: Hungry Shark Game',
            x:-20
        }, */
        xAxis: {
            categories: [
					'5','10','15','20','25','30','35','40','45',
					'50','55','60','65','70','75','80','85','90',
					'95','100','105','110','115','120','125','130',
					'135','140','145','150','155','160','165','170',
					'175','180','185','190','195','200','205','210',
					'215','220'
            ],
            title : {
            	text : 'Seconds',
            },
        	labels:{
        		step : 2,
        	}
        },
        yAxis: {
        	plotLines: [{
                value: 0,
                width :1,
                color: '#808080'
                
        	}],
            min: -2,
            max: 4,
            title: {
                text: 'Level'
            },
            tickInterval: 1,
        },
        tooltip: {
            valuePrefix: 'Level '
        },
        legend: {
        	layout: 'vertical',
        	align: 'right',
        	verticalAlign : 'middle',
        	borderWidth : 0
        },
        series: [{
            name: 'Level',
            data: [<%=levelArray[0]%>,<%=levelArray[1]%>,<%=levelArray[2]%>,<%=levelArray[3]%>,<%=levelArray[4]%>,
                   <%=levelArray[5]%>,<%=levelArray[6]%>,<%=levelArray[7]%>,<%=levelArray[8]%>,<%=levelArray[9]%>,
                   <%=levelArray[10]%>,<%=levelArray[11]%>,<%=levelArray[12]%>,<%=levelArray[13]%>,<%=levelArray[14]%>,
                   <%=levelArray[15]%>,<%=levelArray[16]%>,<%=levelArray[17]%>,<%=levelArray[17]%>,<%=levelArray[18]%>,
                   <%=levelArray[20]%>,<%=levelArray[21]%>,<%=levelArray[22]%>,<%=levelArray[23]%>,<%=levelArray[24]%>,
                   <%=levelArray[25]%>,<%=levelArray[26]%>,<%=levelArray[27]%>,<%=levelArray[28]%>,<%=levelArray[29]%>,
                   <%=levelArray[30]%>,<%=levelArray[31]%>,<%=levelArray[32]%>,<%=levelArray[33]%>,<%=levelArray[34]%>,
                   <%=levelArray[35]%>,<%=levelArray[36]%>,<%=levelArray[37]%>,<%=levelArray[38]%>,<%=levelArray[39]%>,
                   <%=levelArray[40]%>,<%=levelArray[41]%>,<%=levelArray[42]%>,<%=levelArray[43]%>,],
        	
        }]
    });
});

</script>
	<!-- Bootstrap Core JavaScript -->
	<script src="js/bootstrap.min.js"></script>
</body>
</html>
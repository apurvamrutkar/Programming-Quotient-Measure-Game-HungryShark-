<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Results</title>
<!-- Bootstrap Core CSS -->
<link href="css/bootstrap.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="css/result.css" rel="stylesheet">
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

</head><!--data-spy="scroll"  -->
<body id="page-top"  data-target=".navbar-fixed-top">
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
				<div class="table-responsive">
					<table class="table table-hover">
						<thead >
							<tr >
								<th>Name</th>
								<th>Email</th>
								<th>Score</th>
								<th>Total time</th>
								<th>Graph link</th>
							</tr>
						</thead>
						<tbody>
							<c:forEach items="${gamers}" var="e">
								<tr>
									<td>${e.name}</td>
									<td>${e.email}</td>
									<td>${e.score}</td>
									<td>${e.time}</td>
									<td><a
										href='/Ratings/calculateRatings?id=${e.id}&name=${e.name}'><img
											src='assets/chart.png' height='30' width='60' /></a></td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	</header>
	
</body>
</html>

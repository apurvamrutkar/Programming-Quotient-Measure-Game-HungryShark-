<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Hungry Shark-Scores</title>
<style>
#gameDiv {
	background-image: url('assets/Scorebackground.jpg');
	width: 80%;
	height: 50%;
	background-size: 100% 93%;
	padding-top: 4%;

	background-repeat: no-repeat;
	color: white;
}
#scores{
	position :relative;
	top : -50px;;
}
#submit {
	padding: 5px 20px 5px 20px;
	background-color: aqua;
}

#logo{
		float : left;
		width :145px;
		position :relative;
		top : -6px;
		padding-left: 8%;
}
body{
		background:url("assets/wb.jpg");
}
#scoreboard{
	padding-top : 4%;
}
</style>
</head>
<body>
<div id="logo">
	<img id="logo" src="assets/final_logo.png">
</div>
<div id="scoreboard" align="center">
	<div id="gameDiv">
		<form action="feedback.html" id="scores">
			<h2 align="center">Scores</h2>
			<table align="center">
				<tr align="center">
					<th>Fishes/<br>Obstacle
					</th>
					<th>&nbsp;&nbsp;&nbsp;</th>
					<th>Fishes Eaten/<br>Hit by Obstacle &nbsp;
					</th>
					<th>Total Fishes/<br>Obstacle
					</th>
				</tr>
				<tr align="center">
					<!-- Green Fish -->
					<td><img src="assets/greenFish.png"></td>
					<td>:</td>
					<td><c:out value="${userFishes[0]}"></c:out></td>
					<td><c:out value="${totalFishes[0]}"></c:out></td>

				</tr>
				<tr align="center">
					<!-- Pink Fish -->
					<td><img src="assets/pinkFish.png"></td>
					<td>:</td>
					<td><c:out value="${userFishes[1]}"></c:out></td>
					<td><c:out value="${totalFishes[1]}"></c:out></td>
				</tr>
				<tr align="center">
					<!-- Mega Fish -->
					<td><img src="assets/Star.gif" width="40px" height="40px"></td>
					<td>:</td>
					<td><c:out value="${userFishes[2]}"></c:out></td>
					<td><c:out value="${totalFishes[2]}"></c:out></td>

				</tr>
				<tr align="center">
					<!-- poisonous Fish -->
					<td><img src="assets/red_fish.gif" width="50px" height="40px"></td>
					<td>:</td>
					<td><c:out value="${userFishes[3]}"></c:out></td>
					<td><c:out value="${totalFishes[3]}"></c:out></td>

				</tr>
				<tr align="center">
					<!-- Blue fish -->
					<td><img src="assets/Blue-Fish.gif" width="50px" height="40px"></td>
					<td>:</td>
					<td><c:out value="${userFishes[4]}"></c:out></td>
					<td><c:out value="${totalFishes[4]}"></c:out></td>

				</tr>
				<tr align="center">
					<!-- Gold Fish -->
					<td><img src="assets/goldfish.png" width="50px" height="30px"></td>
					<td>:</td>
					<td><c:out value="${userFishes[5]}"></c:out></td>
					<td><c:out value="${totalFishes[5]}"></c:out></td>

				</tr>
				<tr align="center">
					<!-- Fighter Fish -->
					<td><img src="assets/fighterFish.png" width="50px"
						height="40px"></td>
					<td>:</td>
					<td><c:out value="${userFishes[6]}"></c:out></td>
					<td><c:out value="${totalFishes[6]}"></c:out></td>

				</tr>
				<tr align="center">
					<!-- Net -->
					<td><img src="assets/net.png" width="50px" height="30px"></td>
					<td>:</td>
					<td><c:out value="${userObstacles[0]}"></c:out></td>
					<td><c:out value="${totalObstacles[0]}"></c:out></td>

				</tr>
				<tr align="center">
					<!-- Stone -->
					<td><img src="assets/stone.png" width="40" height="30px"></td>
					<td>:</td>
					<td><c:out value="${userObstacles[1]}"></c:out></td>
					<td><c:out value="${totalObstacles[1]}"></c:out></td>

				</tr>
				<tr align="center">
					<!-- arrow -->
					<td><img src="assets/arrow.png" width="40px" height="30px"></td>
					<td>:</td>
					<td><c:out value="${userObstacles[2]}"></c:out></td>
					<td><c:out value="${totalObstacles[2]}"></c:out></td>

				</tr>
				<tr align="center">
					<td><b>Total Score</b></td>
					<td><b>:</b></td>
					<td><b><c:out value="${totalScore}"></c:out></b></td>
				</tr>
				<tr>
					<td colspan="4" align="center"><input id="submit"
						type="submit" value="OK"></td>

				</tr>
			</table>
		</form>
	</div>
	</div>
</body>
</html>
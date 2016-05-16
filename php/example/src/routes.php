<?php
// Routes
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


$app->get('/', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/ideas', function (Request $request, Response $response) {
    $this->logger->addInfo("Ideas list");
    $ideas = new stdClass();
    $ideas->hello = "ideas";

    return $response->withJson($ideas);

});

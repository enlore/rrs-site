<?php
require_once __DIR__."/vendor/autoload.php";

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Silex\Application;

use Mailgun\Mailgun;

class RRSApp extends Application {
    # woo
}

$app = new RRSApp();
$app['ENV'] = getenv('APP_ENV') ?: 'production';
$env = $app['ENV'];

$app->register(new Igorw\Silex\ConfigServiceProvider(__DIR__."/$env.php"));

# mailgun service
$app['mg'] = function ($app) {
	return new Mailgun($app['MAILGUN_KEY']);
};

# twig
$app->register(new Silex\Provider\TwigServiceProvider(), array(
	'twig.path' => __DIR__ . '/templates',
	'twig.templates' => array(),
	'twig.options' => array(),
	'twig.class_path' => '',
	'twig.form.templates' => array()
));

$app->get('/', function (Request $req) use ($app) {
	$twig = $app['twig'];
	return $twig->render('index.html');
});

$app->get('/contact-us', function () use ($app) {
   return $app['twig']->render('contact-us.html');
});

$app->get('/come_see_us', function () use ($app) {
    return $app['twig']->render('come_see_us.html');
});

$app->get('/sponsor_us', function () use ($app) {
    return $app['twig']->render('sponsor_us.html', array(
        'flash' => ''
    ));
});

$app->post('/sponsor_us', function (Request $req) use ($app) {
    if (!$req->get('bond') == '') {
        return $app['twig']->render('skate_with_us.html', array(
            'flash' => $app['FORM_FLASH']
        ));
    }

    $business_name      = $req->get('business_name');
    $individual_name    = $req->get('individual_name');
    $business_phone     = $req->get('business_phone');
    $cell_phone         = $req->get('cell_phone');
    $notes              = $req->get('notes');

    $format = "\nBusiness: %s\nContact: %s\nPhone: %s\nCell: %s\n\nNotes:\n\t%s";
    $body = sprintf($format,
        $business_name, $individual_name,
        $business_phone, $cell_phone, $notes);

    $app['mg']->sendMessage($app['MAILGUN_DOMAIN'], array(
        'from' => $app['MAILGUN_FROM'],
        'to' => $app['MAILGUN_SPONSORSHIP_RECIPIENTS'],
        'subject' => 'SPONSORSHIP',
        'text' => $body
    ));

    return $app['twig']->render('sponsor_us.html', array(
        'flash' => $app['FORM_FLASH']
    ));
});

$app->get('/skate_with_us', function () use ($app) {
    return $app['twig']->render('skate_with_us.html', array(
        'flash' => ''
    ));
});

$app->post('/skate_with_us', function (Request $req) use ($app) {
    // secret squirrel field
    if (!$req->get('bond') == '') {
        return $app['twig']->render('skate_with_us.html', array(
            'flash' => $app['FORM_FLASH']
        ));
    }

    $name = $req->get('name');
    $phone = $req->get('phone');
    $email = $req->get('email');
    $reason = $req->get('reason');
    $format = "\nName: %s\nPhone: %s\nEmail: %s\nReason for joining: %s\n";
    $body = sprintf($format, $name, $phone, $email, $reason);

    $app['mg']->sendMessage($app['MAILGUN_DOMAIN'], array(
        'from' => $app['MAILGUN_FROM'],
        'to' => $app['MAILGUN_FRESH_MEAT_RECIPIENTS'],
        'subject' => 'FRESH MEAT',
        'text' => $body
    ));

    return $app['twig']->render('skate_with_us.html', array(
        'flash' => $app['FORM_FLASH']
    ));
});

$app->run();

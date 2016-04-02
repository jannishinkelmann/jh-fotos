<!DOCTYPE html>

<!-- PicDrop Web-Integration - v:1.1 -->

<?php

/* variables */
$appURL         = 'https://www.picdrop.de';
$domainUuid     = 'f081f7af72d214b2d6c21247032a6c05';
$title          = 'jh-fotos';

$request        = $_GET['r'];
$webIntURL      = null;

/* assemble webintegration URL (Apache) */
$host = empty($_SERVER['HTTP_HOST']) ? null : $_SERVER['HTTP_HOST'];

if($host !== null)
{
    $relPath = null;

    if(!empty($_SERVER["REQUEST_URI"]))
    {
        $dirPath            = str_replace('\\', '/', dirname(__FILE__));
        $dirPathElements    = explode('/', trim($dirPath, '/'));

        $pathElements       = explode('/', trim($_SERVER["REQUEST_URI"], '/'));
        $relPathElements    = array();

        if(empty($pathElements)) $relPath = '';
        else
        {
            $peCur = 0;
            for ($i = 0, $c = count($dirPathElements); $i < $c; $i++)
            {
                if ($dirPathElements[$i] === $pathElements[$peCur])
                {
                    $relPathElements[] = $dirPathElements[$i];
                    $peCur++;
                }
            }

            $relPath = implode('/', $relPathElements);
        }
    }

    if($relPath !== null) $webIntURL = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . trim($host . '/' . $relPath, '/');
}

/* assemble query params */
$queryParams = $_GET;
unset($queryParams['r']);

if($webIntURL !== null) $queryParams['wi'] = $webIntURL;

/* assemble target url */
$targetURL = $appURL.'/webintegration/gateway/'.$domainUuid.'/'.$request.(empty($queryParams) ? '' : '?'.http_build_query($queryParams));

/* set js vars */
$jsVars = array(
    'appURL'        => $appURL,
    'domainUuid'    => $domainUuid,
    'targetURL'     => $targetURL
);

?>

<html>
    <head>
        <title><?php echo $title; ?></title>

        <meta name="robots" content="noindex,nofollow" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
        
        <script type="text/javascript">window.TobyVars = <?php echo json_encode($jsVars); ?>;</script>
        
        <link rel="stylesheet" type="text/css" media="all" href="<?php echo $appURL; ?>/themes/picdrop/css/webintegration.css" />
        <script type="text/javascript" src="<?php echo $appURL; ?>/themes/picdrop/js/min/webintegration.min.js"></script>

    </head>

    <body>
        <iframe src="<?php echo $targetURL; ?>" ></iframe>
    </body>
</html>

<?php

namespace ContactoBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use ModelosBundle\Entity\Contacto;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function ajaxAction(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
            $res = 'ko';
            $content = $request->getContent();
            $params = json_decode($content, true);
            $contacto = new Contacto();
            $contacto->setNombre( $params['nombre']);
            $contacto->setEmail($params['email']);
            $contacto->setComentario( $params['comentario']);

            $em = $this->getDoctrine()->getEntityManager();
            $em->persist($contacto);

            $flush = $em->flush();
            if($flush != null){$res = 'ko';}else{$res = 'ok';}

            return new JsonResponse(array('data' => $res));
        }

        return null;
    }
}

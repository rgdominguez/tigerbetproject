<?php

namespace DeportesBundle\Controller;

use ModelosBundle\Entity\Juegos;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        if ($this->get('session')->has('usuario')) {
            $deportes = null;

            //Seleccionar las entradas que sean de la subcategoria DEPORTES
            $repositorio_deportes = $this->getDoctrine()->getRepository(Juegos::class);
            $deportes = $repositorio_deportes
                ->findBy(
                    array('idSubcategoria' => 3)
                );


            return $this->render(':deportes:deportes.html.twig', [
                'deportes' => $deportes
            ]);
        }else{
            return $this->render('::404.html.twig');
        }
    }
}

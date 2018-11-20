<?php

namespace CasinoBundle\Controller;

use ModelosBundle\Entity\Juegos;
use ModelosBundle\Entity\Usuarios;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        if ($this->get('session')->has('usuario')){
            $games = null;
            $repositorio_casino = $this->getDoctrine()->getRepository(Juegos::class);
            $games = $repositorio_casino->findBy(array('idSubcategoria' => '2'));
            return $this->render('casino/casino.html.twig', ['games'=> $games]);
        }else{
            return $this->render('::404.html.twig');
        }
    }

    public function gameAction($slug)
    {
        if ($this->get('session')->has('usuario')) {
            $session = array(
                'username' => $this->get('session')->get('usuario'),
                'usermail' => $this->get('session')->get('email'),
            );

            return $this->render('casino/game.html.twig', [
                'slug' => $slug,
                'session' => $session,
                'saldo' => $this->getPuntuacion($session)[0]->getAcumulado()
            ]);
        }else{
            return $this->render('::404.html.twig');
        }
    }

    public function getPuntuacion($profile){
        $repo_usuarios = $this->getDoctrine()->getRepository(Usuarios::class);
        $query_usuarios = $repo_usuarios->createQueryBuilder('u')
            ->where('u.email=:email and u.nombre=:nombre')
            ->setParameter('email', $profile['usermail'])
            ->setParameter('nombre', $profile['username'])
            ->getQuery();
        return $query_usuarios->getResult();
    }
}

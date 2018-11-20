<?php

namespace IndexBundle\Controller;

use ModelosBundle\Entity\Noticia;
use ModelosBundle\Entity\Subcategoria;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        //recogemos el repositorio desde la clase Categoria
        $repositorio_subcategorias = $this->getDoctrine()->getRepository(Subcategoria::class);
        $subcategorias = $repositorio_subcategorias->findAll();

        $repo_noticias = $this->getDoctrine()->getRepository(Noticia::class);
        $query_noticias = $repo_noticias->createQueryBuilder('n')
            ->setMaxResults(3)
            ->addOrderBy('n.fechaPublicacion', 'DESC')
            ->getQuery();
        $noticias = $query_noticias->getResult();

        //Borrar sesión
        //$this->get('session')->remove('usuario');
        //var_dump($this->get('session')->has('usuario'));

        //Renderización de vista y paso de parámetros
        return $this->render('index/index.html.twig', [
            'subcategorias' => $subcategorias,
            'noticias'      => $noticias
        ]);
    }
}

<?php

namespace CuentaUsuarioBundle\Controller;

use ModelosBundle\Entity\Apuestas;
use ModelosBundle\Entity\Juegos;
use ModelosBundle\Entity\Usuarios;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function errorAction(){
        return $this->render('::404.html.twig');
    }

    public function indexAction(Request $request)
    {
        if ($this->get('session')->has('usuario')) {
            $repo_usuario = $this->getDoctrine()->getRepository(Usuarios::class);
            $repo_juegos = $this->getDoctrine()->getRepository(Juegos::class);
            $repo_apuestas = $this->getDoctrine()->getRepository(Apuestas::class);

            $nombre = $request->getSession()->get('usuario');
            $email = $request->getSession()->get('email');

            //Recupera el usuario que tiene la sesión iniciada
            $id_usuario = $repo_usuario
                ->findOneBy(array('nombre' => $nombre, 'email' => $email))
                ->getId();

            //Recupera las apuestas del usuario que tiene la seesión iniciada
            $apuestas = $repo_apuestas->findByIdUsuario(array(
                    'id_usuario' => $id_usuario
                )
            );

            return $this->render('micuenta/micuenta.html.twig', [
                'apuestas' => $apuestas
            ]);
        }else{
            return $this->render('::404.html.twig');
        }
    }

    public function loginAction(Request $request){
        if ($request->isXmlHttpRequest()) {
            $em = $this->getDoctrine()->getEntityManager();
            $db = $em->getConnection();

            $content = $request->getContent();
            $params = json_decode($content, true);

            $query = "SELECT * FROM usuarios WHERE email = :email and password = :password";
            $stmt = $db->prepare($query);
            $prms = array(
                'email' => $params['email'],
                'password' => $params['password']
            );
            $stmt->execute($prms);
            $res = $stmt->fetch();

            if($stmt->rowCount() > 0){
                $this->get('session')->set("usuario", $res['nombre']);
                $this->get('session')->set("email", $res['email']);

                return new JsonResponse(array(
                    'data' => 'ok',
                    'nombre' => $res['nombre'],
                    'email'  => $res['email'],
                    'fecha_alta' => $res['fecha_ingreso']
                    ));
            }else{
                return new JsonResponse(array('data' => 'ko'));
            }
        }
        return $this->redirect("/inicio");
    }


    public function registroAction(Request $request)
    {
        if ($request->isXmlHttpRequest()) {

            $content = $request->getContent();
            $params = json_decode($content, true);

            $usuario = new Usuarios();
            $usuario->setNombre($params['nombre']);
            $usuario->setEmail($params['email']);
            $usuario->setPassword($params['password']);
            $usuario->setFechaIngreso(new \DateTime("now"));
            $usuario->setAcumulado(20);

            $em = $this->getDoctrine()->getEntityManager();
            $em->persist($usuario);

            $flush = $em->flush();
            if($flush != null){
                return new JsonResponse(array(
                    'data' => 'ko'
                ));
            }else{
                $this->get('session')->set("usuario", $usuario->getNombre());
                $this->get('session')->set("email", $usuario->getEmail());
                return new JsonResponse(array(
                    'data' => 'ok',
                    'nombre' => $usuario->getNombre(),
                    'email'  => $usuario->getEmail()
                ));
            }
        }
        return $this->redirect("/inicio");
    }
}

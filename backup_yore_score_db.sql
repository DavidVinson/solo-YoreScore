PGDMP                          }         
   yore_score    15.8 (Postgres.app)    15.8 (Postgres.app)     <           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            =           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            >           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16454 
   yore_score    DATABASE     �   CREATE DATABASE yore_score WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';
    DROP DATABASE yore_score;
                davidvinson    false            �            1259    16475    game    TABLE       CREATE TABLE public.game (
    id integer NOT NULL,
    user_id integer NOT NULL,
    course character varying(80) NOT NULL,
    wager integer NOT NULL,
    "isFrontNine" boolean DEFAULT true NOT NULL,
    current_round integer DEFAULT 1 NOT NULL,
    player1 character varying(80) DEFAULT 'player1'::character varying NOT NULL,
    player2 character varying(80) DEFAULT 'player2'::character varying NOT NULL,
    player3 character varying(80) DEFAULT 'player3'::character varying NOT NULL,
    player4 character varying(80) DEFAULT 'player4'::character varying NOT NULL,
    game_mode integer DEFAULT 0 NOT NULL,
    game_status integer DEFAULT 1 NOT NULL,
    start_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    end_time timestamp without time zone
);
    DROP TABLE public.game;
       public         heap    davidvinson    false            �            1259    16474    game_id_seq    SEQUENCE     �   CREATE SEQUENCE public.game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.game_id_seq;
       public          davidvinson    false    219            @           0    0    game_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.game_id_seq OWNED BY public.game.id;
          public          davidvinson    false    218            �            1259    16467    round    TABLE     A  CREATE TABLE public.round (
    id integer NOT NULL,
    game_id integer NOT NULL,
    hole_number integer,
    bingo character varying(80),
    bango character varying(80),
    bongo character varying(80),
    start_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    end_time timestamp without time zone
);
    DROP TABLE public.round;
       public         heap    davidvinson    false            �            1259    16466    round_id_seq    SEQUENCE     �   CREATE SEQUENCE public.round_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.round_id_seq;
       public          davidvinson    false    217            A           0    0    round_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.round_id_seq OWNED BY public.round.id;
          public          davidvinson    false    216            �            1259    16456    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(1000) NOT NULL
);
    DROP TABLE public."user";
       public         heap    davidvinson    false            �            1259    16455    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          davidvinson    false    215            B           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          davidvinson    false    214            �           2604    16478    game id    DEFAULT     b   ALTER TABLE ONLY public.game ALTER COLUMN id SET DEFAULT nextval('public.game_id_seq'::regclass);
 6   ALTER TABLE public.game ALTER COLUMN id DROP DEFAULT;
       public          davidvinson    false    219    218    219            �           2604    16470    round id    DEFAULT     d   ALTER TABLE ONLY public.round ALTER COLUMN id SET DEFAULT nextval('public.round_id_seq'::regclass);
 7   ALTER TABLE public.round ALTER COLUMN id DROP DEFAULT;
       public          davidvinson    false    216    217    217            �           2604    16459    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          davidvinson    false    214    215    215            9          0    16475    game 
   TABLE DATA           �   COPY public.game (id, user_id, course, wager, "isFrontNine", current_round, player1, player2, player3, player4, game_mode, game_status, start_time, end_time) FROM stdin;
    public          davidvinson    false    219   �        7          0    16467    round 
   TABLE DATA           d   COPY public.round (id, game_id, hole_number, bingo, bango, bongo, start_time, end_time) FROM stdin;
    public          davidvinson    false    217   !       5          0    16456    user 
   TABLE DATA           8   COPY public."user" (id, username, password) FROM stdin;
    public          davidvinson    false    215   "       C           0    0    game_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.game_id_seq', 1, true);
          public          davidvinson    false    218            D           0    0    round_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.round_id_seq', 9, true);
          public          davidvinson    false    216            E           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 1, true);
          public          davidvinson    false    214            �           2606    16489    game game_pk 
   CONSTRAINT     J   ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_pk PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.game DROP CONSTRAINT game_pk;
       public            davidvinson    false    219            �           2606    16473    round round_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.round
    ADD CONSTRAINT round_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.round DROP CONSTRAINT round_pk;
       public            davidvinson    false    217            �           2606    16463    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            davidvinson    false    215            �           2606    16465    user user_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_username_key;
       public            davidvinson    false    215            �           2606    16495    game game_user_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.game
    ADD CONSTRAINT game_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;
 >   ALTER TABLE ONLY public.game DROP CONSTRAINT game_user_id_fk;
       public          davidvinson    false    3485    215    219            �           2606    16490    round round_game_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.round
    ADD CONSTRAINT round_game_id_fk FOREIGN KEY (game_id) REFERENCES public.game(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.round DROP CONSTRAINT round_game_id_fk;
       public          davidvinson    false    219    3491    217            9   [   x�]�M
� ���)��232h^��������m��\�7f��6����廷G. ��[
VtbM⓪Q8��$��D5�3�|7�8      7   �   x���KJ�@EǩU���Կ�{-NBĉ�뷍1b�ҿ��nU5����1/�F�ƍ크�4��()z���Ua%���aZާ��^��m�_�M��y��Y%�8Y��I5�Q��r�L�ӝ�C/�~�T��;X��o��$�N�G�F�^���|g�Kcb�)�7�Cr�0�Ό�����D�Y2-�j�Cv\�i��'�68����Ԡ�U�[��s�S��8"a(< �J:��      5   Q   x�3�LI,K�T1JT14P��p)rtrv���
,(�.�	q	.-3rLtq�w�7JO
���/4�1v6p�.7�q������� ��     
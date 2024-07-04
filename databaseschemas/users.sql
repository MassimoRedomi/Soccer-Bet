--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Homebrew)
-- Dumped by pg_dump version 14.11 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: massimoredomi
--

CREATE TABLE public.users (
    email character varying(255) NOT NULL,
    password character varying(60) NOT NULL
);


ALTER TABLE public.users OWNER TO massimoredomi;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: massimoredomi
--

COPY public.users (email, password) FROM stdin;
massimoredomi@gmail.com	$2b$10$T3s0utVZpIJS0AZ4ZvF4tuf1rIrjZJCXNO5wydrPRLhqQnIWjBUOe
redomisenior@icloud.com	$2b$10$PHSbyMeQUMrdX2iknS6iX.lqdYNcpU81Q8ICRheyVReUeLsFyYSEm
pippo@gmail.com	$2b$10$bmtXuTi3aO1f2/uOFn0qPubj7uEXP2Y3jNbAMwMmKtiNMp6xU93C2
manonimo185@gmail.com	$2b$10$6gPe8IJeWrVeWWguG2QhX.FVWbdAb2DjwXlf2XkE1HmVuYsUMyTou
mina.martinello@gmail.com	$2b$10$Nopevr6utYjSzvoEHtv.y.boUb.VXxUZukZ4O.ALBLM0.qHpTEu72
Pippo.sabudo@gmail.com	$2b$10$VYSOEUGIKtDW5oifWePZ4.qf390VvTgpb.bknpGjTqnqi.FpeSlSi
pippo.sabudo@gmail.com	$2b$10$EKNBHU5n0/sv886CYNHenuuaeEY161CadWYVZtScx8wIO8Uj8tUau
pippo.sabaudo@gmail.com	$2b$10$Wz499Zz3.9fs8rW0sFMNdeADzIOPM0ZAhKhDr4VQM8OKkCzRoQqkS
mauri@gmail.com	$2b$10$s7Z9HS1FKEKFsA4ENjUZO.9eZsxkaOdN./JFfyrChGN5D.w9DJzue
\.


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: massimoredomi
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- PostgreSQL database dump complete
--


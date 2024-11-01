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
-- Name: competitions; Type: TABLE; Schema: public; Owner: massimoredomi
--

CREATE TABLE public.competitions (
    competition_id character varying(50) NOT NULL,
    competition_code character varying(255),
    name character varying(255),
    sub_type character varying(100),
    type character varying(100),
    country_id character varying(100),
    country_name character varying(100),
    domestic_league_code character varying(50),
    confederation character varying(50),
    url character varying(1024)
);


ALTER TABLE public.competitions OWNER TO massimoredomi;

--
-- Data for Name: competitions; Type: TABLE DATA; Schema: public; Owner: massimoredomi
--

COPY public.competitions (competition_id, competition_code, name, sub_type, type, country_id, country_name, domestic_league_code, confederation, url) FROM stdin;
CIT	italy-cup	italy-cup	domestic_cup	domestic_cup	75	Italy	IT1	europa	https://www.transfermarkt.co.uk/italy-cup/startseite/wettbewerb/CIT
NLSC	johan-cruijff-schaal	johan-cruijff-schaal	domestic_super_cup	other	122	Netherlands	NL1	europa	https://www.transfermarkt.co.uk/johan-cruijff-schaal/startseite/wettbewerb/NLSC
GRP	kypello-elladas	kypello-elladas	domestic_cup	domestic_cup	56	Greece	GR1	europa	https://www.transfermarkt.co.uk/kypello-elladas/startseite/wettbewerb/GRP
POSU	supertaca-candido-de-oliveira	supertaca-candido-de-oliveira	domestic_super_cup	other	136	Portugal	PO1	europa	https://www.transfermarkt.co.uk/supertaca-candido-de-oliveira/startseite/wettbewerb/POSU
RUSS	russian-super-cup	russian-super-cup	domestic_super_cup	other	141	Russia	RU1	europa	https://www.transfermarkt.co.uk/russian-super-cup/startseite/wettbewerb/RUSS
SUC	supercopa	supercopa	domestic_super_cup	other	157	Spain	ES1	europa	https://www.transfermarkt.co.uk/supercopa/startseite/wettbewerb/SUC
USC	uefa-super-cup	uefa-super-cup	uefa_super_cup	other	-1	\N	\N	europa	https://www.transfermarkt.co.uk/uefa-super-cup/startseite/pokalwettbewerb/USC
DK1	superligaen	superligaen	first_tier	domestic_league	39	Denmark	DK1	europa	https://www.transfermarkt.co.uk/superligaen/startseite/wettbewerb/DK1
EL	europa-league	europa-league	europa_league	international_cup	-1	\N	\N	europa	https://www.transfermarkt.co.uk/europa-league/startseite/pokalwettbewerb/EL
ES1	laliga	laliga	first_tier	domestic_league	157	Spain	ES1	europa	https://www.transfermarkt.co.uk/laliga/startseite/wettbewerb/ES1
FR1	ligue-1	ligue-1	first_tier	domestic_league	50	France	FR1	europa	https://www.transfermarkt.co.uk/ligue-1/startseite/wettbewerb/FR1
IT1	serie-a	serie-a	first_tier	domestic_league	75	Italy	IT1	europa	https://www.transfermarkt.co.uk/serie-a/startseite/wettbewerb/IT1
NL1	eredivisie	eredivisie	first_tier	domestic_league	122	Netherlands	NL1	europa	https://www.transfermarkt.co.uk/eredivisie/startseite/wettbewerb/NL1
RUP	russian-cup	russian-cup	domestic_cup	domestic_cup	141	Russia	RU1	europa	https://www.transfermarkt.co.uk/russian-cup/startseite/wettbewerb/RUP
PO1	liga-portugal-bwin	liga-portugal-bwin	first_tier	domestic_league	136	Portugal	PO1	europa	https://www.transfermarkt.co.uk/liga-portugal-bwin/startseite/wettbewerb/PO1
GB1	premier-league	premier-league	first_tier	domestic_league	189	England	GB1	europa	https://www.transfermarkt.co.uk/premier-league/startseite/wettbewerb/GB1
ELQ	europa-league-qualifikation	europa-league-qualifikation	europa_league_qualifying	international_cup	-1	\N	\N	europa	https://www.transfermarkt.co.uk/europa-league-qualifikation/startseite/pokalwettbewerb/ELQ
CGB	efl-cup	efl-cup	league_cup	other	189	England	GB1	europa	https://www.transfermarkt.co.uk/efl-cup/startseite/wettbewerb/CGB
DKP	sydbank-pokalen	sydbank-pokalen	domestic_cup	domestic_cup	39	Denmark	DK1	europa	https://www.transfermarkt.co.uk/sydbank-pokalen/startseite/wettbewerb/DKP
ECLQ	uefa-europa-conference-league-qualifikation	uefa-europa-conference-league-qualifikation	uefa_europa_conference_league_qualifiers	international_cup	-1	\N	\N	europa	https://www.transfermarkt.co.uk/uefa-europa-conference-league-qualifikation/startseite/pokalwettbewerb/ECLQ
FAC	fa-cup	fa-cup	domestic_cup	domestic_cup	189	England	GB1	europa	https://www.transfermarkt.co.uk/fa-cup/startseite/wettbewerb/FAC
NLP	toto-knvb-beker	toto-knvb-beker	domestic_cup	domestic_cup	122	Netherlands	NL1	europa	https://www.transfermarkt.co.uk/toto-knvb-beker/startseite/wettbewerb/NLP
UKRS	ukrainian-super-cup	ukrainian-super-cup	domestic_super_cup	other	177	Ukraine	UKR1	europa	https://www.transfermarkt.co.uk/ukrainian-super-cup/startseite/wettbewerb/UKRS
UKR1	premier-liga	premier-liga	first_tier	domestic_league	177	Ukraine	UKR1	europa	https://www.transfermarkt.co.uk/premier-liga/startseite/wettbewerb/UKR1
CDR	copa-del-rey	copa-del-rey	domestic_cup	domestic_cup	157	Spain	ES1	europa	https://www.transfermarkt.co.uk/copa-del-rey/startseite/wettbewerb/CDR
CL	uefa-champions-league	uefa-champions-league	uefa_champions_league	international_cup	-1	\N	\N	europa	https://www.transfermarkt.co.uk/uefa-champions-league/startseite/pokalwettbewerb/CL
GR1	super-league-1	super-league-1	first_tier	domestic_league	56	Greece	GR1	europa	https://www.transfermarkt.co.uk/super-league-1/startseite/wettbewerb/GR1
TR1	super-lig	super-lig	first_tier	domestic_league	174	Turkey	TR1	europa	https://www.transfermarkt.co.uk/super-lig/startseite/wettbewerb/TR1
POCP	allianz-cup	allianz-cup	domestic_cup	domestic_cup	136	Portugal	PO1	europa	https://www.transfermarkt.co.uk/allianz-cup/startseite/wettbewerb/POCP
GBCS	community-shield	community-shield	domestic_super_cup	other	189	England	GB1	europa	https://www.transfermarkt.co.uk/community-shield/startseite/wettbewerb/GBCS
KLUB	fifa-klub-wm	fifa-klub-wm	fifa_club_world_cup	other	-1	\N	\N	europa	https://www.transfermarkt.co.uk/fifa-klub-wm/startseite/pokalwettbewerb/KLUB
L1	bundesliga	bundesliga	first_tier	domestic_league	40	Germany	L1	europa	https://www.transfermarkt.co.uk/bundesliga/startseite/wettbewerb/L1
RU1	premier-liga	premier-liga	first_tier	domestic_league	141	Russia	RU1	europa	https://www.transfermarkt.co.uk/premier-liga/startseite/wettbewerb/RU1
SC1	scottish-premiership	scottish-premiership	first_tier	domestic_league	190	Scotland	SC1	europa	https://www.transfermarkt.co.uk/scottish-premiership/startseite/wettbewerb/SC1
SCI	supercoppa-italiana	supercoppa-italiana	domestic_super_cup	other	75	Italy	IT1	europa	https://www.transfermarkt.co.uk/supercoppa-italiana/startseite/wettbewerb/SCI
BE1	jupiler-pro-league	jupiler-pro-league	first_tier	domestic_league	19	Belgium	BE1	europa	https://www.transfermarkt.co.uk/jupiler-pro-league/startseite/wettbewerb/BE1
CLQ	uefa-champions-league-qualifikation	uefa-champions-league-qualifikation	uefa_champions_league_qualifying	international_cup	-1	\N	\N	europa	https://www.transfermarkt.co.uk/uefa-champions-league-qualifikation/startseite/pokalwettbewerb/CLQ
DFL	dfl-supercup	dfl-supercup	domestic_super_cup	other	40	Germany	L1	europa	https://www.transfermarkt.co.uk/dfl-supercup/startseite/wettbewerb/DFL
SFA	sfa-cup	sfa-cup	domestic_cup	domestic_cup	190	Scotland	SC1	europa	https://www.transfermarkt.co.uk/sfa-cup/startseite/wettbewerb/SFA
UKRP	ukrainian-cup	ukrainian-cup	domestic_cup	domestic_cup	177	Ukraine	UKR1	europa	https://www.transfermarkt.co.uk/ukrainian-cup/startseite/wettbewerb/UKRP
DFB	dfb-pokal	dfb-pokal	domestic_cup	domestic_cup	40	Germany	L1	europa	https://www.transfermarkt.co.uk/dfb-pokal/startseite/wettbewerb/DFB
FRCH	trophee-des-champions	trophee-des-champions	domestic_super_cup	other	50	France	FR1	europa	https://www.transfermarkt.co.uk/trophee-des-champions/startseite/wettbewerb/FRCH
\.


--
-- Name: competitions competitions_pkey; Type: CONSTRAINT; Schema: public; Owner: massimoredomi
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT competitions_pkey PRIMARY KEY (competition_id);


--
-- PostgreSQL database dump complete
--


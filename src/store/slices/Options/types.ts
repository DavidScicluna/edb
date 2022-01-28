export type Country = {
  iso_3166_1?: string;
  english_name?: string;
};

export type Language = {
  iso_639_1?: string;
  english_name?: string;
  name?: string;
};

export type Job = {
  department?: string;
  jobs?: string[];
};

export type Genre = {
  id?: number;
  name?: string;
};

export type Certification = {
  certification?: string;
  meaning?: string;
  order?: number;
};

type CertificationKey = 'US' | 'CA' | 'DE' | 'GB' | 'AU' | 'BR' | 'FR' | 'NZ' | 'IN';

export type Certifications = { [key in CertificationKey]: Certification[] };

type OptionsGenre = {
  movie: Genre[];
  tv: Genre[];
};

type OptionsCertifications = {
  movie?: Certifications;
  tv?: Certifications;
};

export type StateProps = {
  data: {
    countries: Country[];
    languages: Language[];
    jobs: Job[];
    genres: OptionsGenre;
    certifications: OptionsCertifications;
  };
};

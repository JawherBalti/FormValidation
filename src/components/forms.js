import React, { Component } from 'react'
import './form.css'
export default class forms extends Component {
  state = {
    //variables d'entrée
    prenom: '',
    nom: '',
    password: '',
    email: '',
    //messages du formulaire
    submitSuccess: '',
    submitFail: '',
    //messages d'erreur pour les champs
    prenomValid: '',
    nomValid: '',
    passwordValid: '',
    emailValid: '',
    //verifier si les champs sont valide
    isPrenomValid: false,
    isNomValid: false,
    isPasswordValid: false,
    isEmailValid: false,
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
    this.validForm(name, value)
  }

  //Envoi du formulaire
  handleSubmit = (e) => {
    //si tous les champs sont valide
    if (
        !this.state.isPrenomValid ||
        !this.state.isNomValid ||
        !this.state.isPasswordValid ||
        !this.state.isEmailValid
    ) {
      this.setState({
        submitFail: 'Veuiller Remplir Tous Les Champs',
      })
      //afficher le message de succès pour 5 secondes
      setInterval(() => {
        this.setState({
          submitFail: '',
        })
      }, 5000)
    } else {
      //eviter de recharger la page
      e.preventDefault()
      //reinitialisation des valeurs d'entrée et affichage d'un message de succès
      this.setState({
        submitSuccess: 'Formulaire Envoyé Avec Succes!',
        prenom: '',
        nom: '',
        password: '',
        email: '',
      })
      //afficher le message de succès pour 5 secondes
      setInterval(() => {
        this.setState({
          submitSuccess: '',
        })
      }, 5000)
    }
  }

  //annuler le formulaire
  handleAnnuler = (e) => {
    //si l'un des champs n'est pas vide
    if (
        !this.state.isPrenomValid ||
        !this.state.isNomValid ||
        !this.state.isPasswordValid ||
        !this.state.isEmailValid
    ) {
      //reinitialisation des valeurs d'entrée et affichage d'un message d'annulation
      e.preventDefault()
      this.setState({
        submitFail: 'Vous Avez Annulé Le Formulaire',
        prenom: '',
        nom: '',
        password: '',
        email: '',
        prenomValid: '',
        nomValid: '',
        passwordValid: '',
        emailValid: '',
      })
      //afficher le message d'annulation pour 5 secondes
      setInterval(() => {
        this.setState({
          submitFail: '',
        })
      }, 5000)
    }
  }

  //fonction pour valider le formulaire
  validForm = (name, value) => {
    switch (name) {
      case 'prenom':
        if (value.length < 2 || value === "") {
          this.setState({
            prenomValid: 'Prenom Doit Avoir Au Moins 2 Caractères!',
            isPrenomValid: false,
          })
        } else {
          this.setState({
            prenomValid: '',
            isPrenomValid: true,
          })
        }
        break
      case 'nom':
        if (value.length < 2 || value === "") {
          this.setState({
            nomValid: 'Nom Doit Avoir Au Moins 2 Caractères!',
            isNomValid: false,
          })
        } else {
          this.setState({
            nomValid: '',
            isNomValid: true,
          })
        }
        break
      case 'password':
        if (value.length < 8 || value === "") {
          this.setState({
            passwordValid: 'Mot De Passe Doit Avoir Au Moins 8 Caractères!',
            isPasswordValid: false,
          })
        } else {
          this.setState({
            passwordValid: '',
            isPasswordValid: true,
          })
        }
        break
      case 'email':
        //l'expression que doit respecter l'email
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (regex.test(value) === false || value === "") {
          this.setState({
            emailValid: 'Email Invalide!',
            isEmailValid: false
          })
        } else {
          this.setState({
            emailValid: '',
            isEmailValid: true
          })
        }
        break
      default:
        break
    }
  }

  render() {
    return (
      <form>
        <span className="success">{this.state.submitSuccess}</span>
        <span className="error">{this.state.submitFail}</span>
        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <span className="error">{this.state.prenomValid}</span>
          <input
            onChange={this.onChange}
            value={this.state.prenom}
            className="form-control"
            placeholder="Entrer votre prénom"
            type="text"
            name="prenom"
            minLength="2"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <span className="error">{this.state.nomValid}</span>
          <input
            onChange={this.onChange}
            value={this.state.nom}
            className="form-control"
            placeholder="Entrer votre nom"
            type="text"
            name="nom"
            minLength="2"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <span className="error">{this.state.emailValid}</span>
          <input
            onChange={this.onChange}
            value={this.state.email}
            className="form-control"
            placeholder="Entrer votre email"
            type="email"
            name="email"
            pattern="^(?:[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <span className="error">{this.state.passwordValid}</span>
          <input
            onChange={this.onChange}
            value={this.state.password}
            className="form-control"
            placeholder="Entrer votre mot de passe"
            type="password"
            name="password"
            minLength="8"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="valider"
            name="valider"
            type="submit"
            value="Valider"
            onClick={this.handleSubmit}
          />
        </div>
        <div className="form-group">
          <input
            className="annuler"
            name="annuler"
            type="submit"
            value="Annuler"
            onClick={this.handleAnnuler}
          />
        </div>
      </form>
    )
  }
}

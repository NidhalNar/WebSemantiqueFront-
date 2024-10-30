import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackClass } from 'src/app/models/feedbackclass';
import { FeedbackService } from 'src/app/service/feedback.service';

@Component({
  selector: 'app-listefeedback',
  templateUrl: './listefeedback.component.html',
  styleUrls: ['./listefeedback.component.css']
})
export class ListefeedbackComponent implements OnInit {

  feedbacks: { feedback: string; rating: number; comment: string; }[] = [];
  loading: boolean = true; // État de chargement
  result = 0;
  listUnis: Feedback[] = [];

  newFeedback: FeedbackClass = { feedback: '', rating: 0, comment: '' };
  showForm = false;

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.getFeedbacks(); // Récupérer les feedbacks à l'initialisation
  }

  // Méthode pour récupérer la liste des feedbacks
  getFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe(
      (data: any) => {
        // Accéder au tableau depuis la structure de données
        const bindings = data.results.bindings; // Récupérer le tableau de feedbacks

        // Vérifier si bindings est un tableau
        if (Array.isArray(bindings)) {
          this.feedbacks = bindings.map((feedback: any) => ({
            feedback: feedback.feedback.value,
            rating: feedback.rating.value, // Accéder à la valeur pour la note
            comment: feedback.comment.value, // Accéder à la valeur pour le commentaire
          }));
        } else {
          console.error('Expected an array but got:', bindings);
        }
      },
      error => {
        console.error('Error fetching feedbacks:', error);

      }
    );
  }

  // Méthode pour supprimer un feedback
  deleteFeedback(feedback: any) {
    console.log(feedback);
    this.feedbackService.deleteFeedback(feedback).subscribe(

      response => {
        // Vérifier si la réponse est au format JSON
        if (response && response.feedback) {
          console.log('Feedback deleted:', response.feedback);
        } else {
          // Traitement de la chaîne de texte
          console.log('Response:', response);
        }
        // Rafraîchir la liste après la suppression
        this.getFeedbacks();
      },
      error => {
        console.error('Error deleting feedback:', error);
        this.getFeedbacks();
      }
    );
  }



  // Méthode pour naviguer vers le composant d'ajout de feedback
  addFeedback() {
    this.router.navigate(['addfeedback']); // Ajustez le chemin si nécessaire
  }

  // Méthode pour ajouter un nouveau feedback
  addNewFeedback(feedback: FeedbackClass) {
    this.feedbackService.addFeedback(feedback).subscribe({
      next: (addedFeedback) => {
        this.listUnis.push(addedFeedback as FeedbackClass);
        this.showForm = false;
        this.getFeedbacks(); // Appeler getFeedbacks pour rafraîchir la liste
        this.router.navigate(['/listfeedback']); // Rediriger vers la liste des feedbacks
      },
      error: (err) => console.log(err),
    });
  }

  // Méthode pour naviguer vers le composant de mise à jour de feedback
  navigateToUpdateFeedback(feedback: any) {
    this.router.navigate(['update', feedback.feedback]); // Passer l'ID ou l'URI du feedback
  }
  submitFeedback(feedback: FeedbackClass) {
    this.addNewFeedback(feedback); // Appeler la méthode pour ajouter le feedback
    this.newFeedback = { feedback: '', rating: 0, comment: '' }; // Réinitialiser le formulaire
  }





}